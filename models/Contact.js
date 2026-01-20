import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    heading: String,
    description: String,
    name: String,
    subtitle: String,
    email: String,
    image: String,
    socials: {
      instagram: String,
      youtube: String,
      linkedin: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", contactSchema);
