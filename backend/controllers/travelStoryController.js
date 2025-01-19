const TravelStory = require('../models/TravelStory');
const fs = require('fs');
const path = require('path');

exports.getAllStories = async (req, res) => {
  try {
    const { author, title, startDate, endDate } = req.query; 
    
    let filter = {};

    if (author) {
      filter.author = author;
    }
    if (title) {
      filter.title = { $regex: title, $options: 'i' }; 
    }
    if (startDate && endDate) {
      filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      filter.createdAt = { $gte: new Date(startDate) };
    } else if (endDate) {
      filter.createdAt = { $lte: new Date(endDate) };
    }

    const stories = await TravelStory.find(filter).sort({ createdAt: -1 });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stories' });
  }
};

exports.createStory = async (req, res) => {
  try {
    const { title, description, author } = req.body; 
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const story = new TravelStory({ title, imageUrl, description, author });
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: 'Error creating story' });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, author } = req.body;

    const story = await TravelStory.findById(id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

  
    if (req.file) {
      const oldImagePath = path.join(__dirname, '..', story.imageUrl);
      
     
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); 
      }

      
      story.imageUrl = `/uploads/${req.file.filename}`;
    }

  
    story.title = title || story.title;
    story.description = description || story.description;
    story.author = author || story.author;

  
    await story.save();
    res.status(200).json(story);
  } catch (error) {
    
    console.error(error);

  
    res.status(500).json({ message: 'Error updating story', error: error.message });
  }
};
exports.deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await TravelStory.findById(id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const imagePath = path.join(__dirname, '..', story.imageUrl);  
    fs.unlinkSync(imagePath);  
    await story.deleteOne();
    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting story' });
  }
};




exports.deleteImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const imagePath = path.join(__dirname, '..', imageUrl); // Resolve correct path
    console.log("Attempting to delete image at path:", imagePath);
    
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete image
      res.status(200).send({ message: "Image deleted successfully" });
    } else {
      res.status(404).send({ error: "Image not found" });
    }
  } catch (err) {
    console.error("Error in deleteImage handler:", err);
    res.status(500).send({ error: "Server error while deleting image" });
  }
};