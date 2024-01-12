import * as express from "express";
import { TeamsController } from "../controllers/teams_controller";
const Router = express.Router();

// Router.get(
//   "/teams",
//   TeamsController.getTeams
// );

Router.get(
    "/teams/:id",
    TeamsController.getTeam
  );
Router.post(
  "/teams",
  TeamsController.createTeam
);
// Router.put(
//   "/teans/:id",
//   TeansController.updateTeam
// );
// Router.delete(
//   "/teans/:id",
//   TeansController.deleteTeam
// );
export { Router as teamRouter };