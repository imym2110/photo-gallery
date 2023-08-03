const mongoose = require("mongoose");
const imageGallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Gallery", imageGallerySchema);

module.exports = Image;
