// models/Vision.js
import mongoose from "mongoose";

const visionSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String, // optional
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Vision", visionSchema);
