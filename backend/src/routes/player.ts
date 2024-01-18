import * as express from "express";
import { PlayerController } from "../controllers/players_controller";
const Router = express.Router();

Router.get(
  "/players", PlayerController.getPlayers);

// Router.post(
//   "/users", PlayerController.createPlayer);

// Router.put(
//    "/users/:id", PlayerController.updatePlayer);

//  Router.delete(
//    "/users/:id", PlayerController.deletePlayer);

export { Router as playerRouter };
