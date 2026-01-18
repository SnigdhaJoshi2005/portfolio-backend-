import mongoose from "mongoose";

const serveSchema = new mongoose.Schema(
  {
    title1: String,
    list: [String],
    description1: String,
    image1: String,

    title2: String,
    description2: String,
    quote: String,
    image2: String,
  },
  { timestamps: true }
);

export default mongoose.models.Serve ||
  mongoose.model("Serve", serveSchema);
