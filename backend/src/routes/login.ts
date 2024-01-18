import * as express from "express";
import { LoginController } from "../controllers/login_controller";
const Router = express.Router();

Router.post(
  "/login",
  LoginController.login);
export { Router as loginRouter };