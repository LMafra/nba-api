import * as express from "express";
import { TeamsController } from "../controllers/teams_controller";
const Router = express.Router();

Router.get(
  "/teams",
  TeamsController.getTeams
);
Router.get(
  "/team",
  TeamsController.getTeam
);
Router.get(
    "/teams/:id",
    TeamsController.getTeamById
  );
Router.post(
  "/teams",
  TeamsController.createTeam
);
Router.put(
  "/teams/:id",
  TeamsController.updateTeam
);
Router.delete(
  "/teams/:id",
  TeamsController.deleteTeam
);
export { Router as teamRouter };