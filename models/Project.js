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
    type: Date,
    default: Date.now(),
  },
  image: {
    type: String,
  },
});

const Project = mongoose.model("project", projectSchema);
export default Project;
