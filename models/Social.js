import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    instagramImg: String,
    instagramUrl: String,

    facebookImg: String,
    facebookUrl: String,

    youtubeTitle: String,
    youtubeEmbedUrl: String, // iframe src only
    youtubeChannelUrl: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Social ||
  mongoose.model("Social", socialSchema);
