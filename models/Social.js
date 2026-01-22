import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    instagramImg: String,
    instagramUrl: String,

    facebookImg: String,
    facebookUrl: String,

    youtubeTitle: String,
    youtubeEmbedUrl: String,
    youtubeChannelUrl: String,
  },
  { timestamps: true }
);

export default mongoose.models.Social ||
  mongoose.model("Social", socialSchema);