import { Router } from "express";
import SessionsControllers from "../controllers/SessionsControllers";
import { sessionSchemaValidation } from "../schemas/SessionSchemas";

const sessionRouter = Router();
const sessionsController = new SessionsControllers();

sessionRouter.post('/', sessionSchemaValidation, sessionsController.create)

export default sessionRouter;
