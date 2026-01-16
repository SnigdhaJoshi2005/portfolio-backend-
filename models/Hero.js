
import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  title: String,
  name: String,
  subtitle: String,
  images: [String], // carousel images
});

export default mongoose.model("Hero", heroSchema);
