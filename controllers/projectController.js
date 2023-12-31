import Project from "../models/Project.js";
import { deleteImage, uploadImage } from "../helpers/cloudinary.js";
import fs from "fs-extra";

const newProject = async (req, res) => {
  const project = new Project(req.body);

  if (req.files?.image) {
    console.log(req.files?.image)
    const result = await uploadImage(req.files.image.tempFilePath);
    

    project.image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };

    await fs.unlink(req.files.image.tempFilePath);
  }

  try {
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    console.log(error);
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects)
      return res.status(404).send({ message: "NO EXISTEN PROYECTOS" });
    res.json(projects);
  } catch (error) {
    return res.status(500).send({ message: "Ocurrio un errror" });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ msg: "no se eoncontro " });

  try {
    await project.deleteOne();
    res.json({ msg: "project deleted" });
  } catch (error) {
    return res.status(500).send({ message: "Ocurrio un errror" });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  let update = req.body;
  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ msg: "no se eoncontro " });

  try {
    let projectUpdates = await Project.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.json(projectUpdates);
  } catch (error) {
    return res.status(500).send({ message: "Ocurrio un errror" });
  }
};

const getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ msg: "no se eoncontro " });
    res.json(project);
  } catch (error) {
    return res.status(500).send({ message: "Ocurrio un errror" });
  }
};

export { newProject, getProject, getProjects, deleteProject, updateProject };
