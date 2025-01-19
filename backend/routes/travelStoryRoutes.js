const express = require('express');
const router = express.Router();
const multer = require('multer');
const TravelStoryController = require('../controllers/travelStoryController');
const { deleteImage } = require('../controllers/travelStoryController');


// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.get('/', TravelStoryController.getAllStories);
router.post('/', upload.single('image'), TravelStoryController.createStory);
router.put('/:id', upload.single('image'), TravelStoryController.updateStory);
router.delete('/:id', TravelStoryController.deleteStory);
router.delete('/:id/delete-image', deleteImage);

module.exports = router;
