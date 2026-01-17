import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  instagram: {
    type: String,
  },

  facebook: {
    type: String,
  },

  youtubeEmbed: {
    type: String, // iframe src only
  },

  youtubeChannel: {
    type: String,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Social", socialSchema);
