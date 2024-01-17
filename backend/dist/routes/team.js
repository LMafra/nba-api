"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRouter = void 0;
const express = __importStar(require("express"));
const teams_controller_1 = require("../controllers/teams_controller");
const Router = express.Router();
exports.teamRouter = Router;
Router.get("/teams", teams_controller_1.TeamsController.getTeams);
Router.get("/team", teams_controller_1.TeamsController.getTeam);
Router.get("/teams/:id", teams_controller_1.TeamsController.getTeamById);
Router.post("/teams", teams_controller_1.TeamsController.createTeam);
Router.put("/teams/:id", teams_controller_1.TeamsController.updateTeam);
Router.delete("/teams/:id", teams_controller_1.TeamsController.deleteTeam);
