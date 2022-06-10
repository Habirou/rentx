import { Router } from "express";
import multer from "multer";

import { CreateCarsController } from "@modules/cars/UseCases/createCar/CreateCarsController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListCategoryController } from "@modules/cars/UseCases/ListCategories/ListCategoryController";
import { CreateCarSpecificationController } from "@modules/cars/UseCases/CreateCatSpecification/CreateCarSpecificationController";
import { UploadCarImageController } from "@modules/cars/UseCases/UploadCarImage/UploadCarImageController";
import uploadConfig from "../../../../config/upload";


const carsRoutes = Router();

const uploadCarImages = multer(uploadConfig.upload("./tmp/carsImages"));


const createCarController = new CreateCarsController();
const listAvailableCarsController = new ListCategoryController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post(
    "/", 
    ensureAuthenticate, 
    ensureAdmin, 
    createCarController.handle
);

carsRoutes.post(
    "/specification/:id",
    ensureAuthenticate, 
    ensureAdmin, 
    createCarSpecificationController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
    "/images/:id",
    ensureAuthenticate, 
    ensureAdmin,
    uploadCarImages.array("images"), 
    uploadCarImageController.handle
);

export { carsRoutes };