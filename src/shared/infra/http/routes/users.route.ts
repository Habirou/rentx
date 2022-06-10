import { Router } from "express";
import { UpadateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import { CreateUserController } from "@modules/accounts/useCases/createUser/createUsersController";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpadateUserAvatarController

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", ensureAuthenticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRoutes };