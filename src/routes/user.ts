import * as express from "express";
import { UserController } from "../controllers/users_controller";
const Router = express.Router();

Router.get(
  "/users",
  UserController.getUsers
);
Router.post(
  "/users",
  UserController.createUser
);
Router.put(
  "/update/:id",
  UserController.updateUser
);
Router.delete(
  "/delete/:id",
  UserController.deleteUser
);
export { Router as userRouter };
