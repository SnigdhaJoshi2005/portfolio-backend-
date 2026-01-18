import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  title: String,
  image: String,

  sections: [
    {
      heading: String,
      text: String,
    },
  ],

  socials: {
    linkedin: String,
    instagram: String,
    facebook: String,
  },
});

export default mongoose.model("About", aboutSchema);
