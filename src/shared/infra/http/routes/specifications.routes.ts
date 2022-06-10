import { CreateSpecificationController } from "@modules/cars/UseCases/CreateSpecification/CreateSpecificationController";
import { request, response, Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
    "/",
    ensureAuthenticate,
    ensureAdmin,  
    createSpecificationController.handle
)

export { specificationsRoutes };