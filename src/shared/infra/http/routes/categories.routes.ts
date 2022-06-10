import { CreateCategoryController } from "@modules/cars/UseCases/CreateCategories/CreateCategoryController";
import { ImportCategoriesController } from "@modules/cars/UseCases/ImportCategories/ImportCategoriesController";
import { ListCategoryController } from "@modules/cars/UseCases/ListCategories/ListCategoryController";
import { request, response, Router } from "express";
import multer, { Multer } from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";



const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoryController = new ListCategoryController();

categoriesRoutes.post(
    "/",
    ensureAuthenticate,
    ensureAdmin,  
    createCategoryController.handle
)

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.post(
    "/import", 
    upload.single("file"),
    ensureAuthenticate,
    ensureAdmin, 
    importCategoriesController.handle
);

export { categoriesRoutes };