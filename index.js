import Express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import projectRoutes from "./routes/projectRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import fileUpload from "express-fileupload";
import cors from 'cors'

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

// //? configurar cors
  const whiteList =[process.env.FRONTEND_URL,process.env.VITE_BACKEND_ADMIN]
  const corsOptions ={
   origin: function(origin,callback){
     if(whiteList.includes(origin)){
       //puede consultar la api
       callback(null,true)
     }else{
       //no esta permitido
       callback(new Error("Error de Cors"))
     }
   }
  }

  app.use(cors(corsOptions))

//?Routing
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`serrvidor corrido ${PORT}`);
});
