import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

const router = Router();
router.post("/autheticate", new AuthenticateUserController().handle)




export { router };
