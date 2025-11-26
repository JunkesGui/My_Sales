import { Router } from "express";
import UpdateAvatarControllers from "../controllers/UpdateAvatarControllers";
import multer from "multer";
import uploadConfig from '@config/upload'
import AuthMiddleware from "@shared/middlewares/authMiddleware";

const avatarRouter = Router()
const userAvatarControllers = new UpdateAvatarControllers();
const upload = multer(uploadConfig)

avatarRouter.patch('/', AuthMiddleware.execute,upload.single('avatar'), userAvatarControllers.update)

export default avatarRouter
