import Express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import projectRoutes from "./routes/projectRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import fileUpload from "express-fileupload";

const app = Express();
app.use(Express.json());
app.use(fileUpload({
  useTempFiles:true,
   tempFileDir:'./uploads'
}))

//? argamos las variables de entorno
dotenv.config();

//?Conectar base de datos
connectDB();

//?Routing
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`serrvidor corrido ${PORT}`);
});
