import * as express from "express";
import { PlayerController } from "../controllers/players_controller";
const Router = express.Router();

Router.get("/players", PlayerController.getPlayers);

Router.get("/players/:id", PlayerController.getPlayersById);

Router.post(
  "/players", PlayerController.createPlayer);

// Router.put(
//    "/players/:id", PlayerController.updatePlayer);

 Router.delete(
   "/players/:id", PlayerController.deletePlayer);

export { Router as playerRouter };
