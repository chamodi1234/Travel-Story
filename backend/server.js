const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const fs = require('fs');


const userRoutes = require("./routes/UserRoutes");
const travelStoryRoutes = require('./routes/travelStoryRoutes');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());  
app.use(cors());         
app.use('/uploads', express.static('uploads')); 


app.use("/api/userRoutes", userRoutes);  
app.use('/api/stories', travelStoryRoutes);  


mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error", err));


app.use(express.static(path.join(__dirname, "build")));  


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
