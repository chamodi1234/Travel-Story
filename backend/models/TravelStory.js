const mongoose = require('mongoose');

const travelStorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true, 
        trim: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("TravelStory", travelStorySchema);
