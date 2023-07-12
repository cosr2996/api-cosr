import Express from "express";
import {
  newCertificate,
  getCertificate,
  getCertificates,
  deleteCertificates,
  updateCertificates,
} from "../controllers/certificateController.js";


const routes = Express.Router()
routes.route('/').get(getCertificates).post(newCertificate)
routes.route('/:id').get(getCertificate).put(updateCertificates).delete(deleteCertificates)




export default routes