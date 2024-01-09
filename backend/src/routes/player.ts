import * as express from "express";
import { PlayerController } from "../controllers/players_controller";
const Router = express.Router();

Router.get(
  "/players", PlayerController.getPlayers);

// Router.post(
//   "/users", UserController.createUser);

// Router.put(
//   "/users/:id", UserController.updateUser);

// Router.delete(
//   "/users/:id", UserController.deleteUser);

export { Router as playerRouter };
