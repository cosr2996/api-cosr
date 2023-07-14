import Certificate from "../models/Certificate.js";
import { deleteImage, uploadImage } from "../helpers/cloudinary.js";
import fs from "fs-extra";

const newCertificate = async (req, res) => {
  const certificate = new Certificate(req.body);

  if (req.files?.image) {
    const result = await uploadImage(req.files.image.tempFilePath);
    

    certificate.image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };

    await fs.unlink(req.files.image.tempFilePath);
  }
  try {
    const saveCertificate = await certificate.save();
    res.json(saveCertificate);
  } catch (error) {
    console.log(error);
  }
};

const getCertificate = async (req, res) => {
  const { id } = req.params;
  try {
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({ msg: "no existe el proyecto" });
    }
    res.json(certificate);
  } catch (error) {
    return res.status(500).json({ msg: "hubo un error" });
  }
};

const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    if (!certificates)
      return res.status(404).json({ msg: "no hay certificados" });
    res.json(certificates);
  } catch (error) {
    return res.status(500).json({ msg: "hubo un error" });
  }
};

const deleteCertificates = async (req, res) => {
  const { id } = req.params;

  try {
    const certificate= await Certificate.findByIdAndDelete(id)
    if (!certificate) return res.status(404).json({ msg: "no encontrado" });

    await deleteImage(certificate.image.public_id)

    res.json(certificate);
  } catch (error) {
    return res.status(500).json({ msg: "error" });
  }
};
const updateCertificates = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const certificate = await Certificate.findById(id);
  if (!certificate) return res.status(404).json({ msg: "no se encontrro" });

  try {
    let certificateUpdated = await Certificate.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.json(certificateUpdated);
  } catch (error) {
    return res.status(500).json({ msg: "hubo un error" });
  }
};

export {
  newCertificate,
  getCertificate,
  getCertificates,
  deleteCertificates,
  updateCertificates,
};
