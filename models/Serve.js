// models/Serve.js
import mongoose from "mongoose";

const serveSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },

  audience: {
    type: [String], // list items
    required: true,
  },

  note: {
    type: String,
  },

  globalHeading: {
    type: String,
  },

  globalDescription: {
    type: String,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Serve", serveSchema);
