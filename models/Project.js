import mongoose, { Schema } from "mongoose";

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  technologies: {
    type: String,
    required: true,
    trim: true,
  },
  finished: {
    type: String
  },
  image: {
    secure_url: String, public_id: String
  },
  url: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("project", projectSchema);
export default Project;
