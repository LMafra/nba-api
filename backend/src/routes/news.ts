import * as express from "express";
import { NewsController } from "../controllers/news_controller";
const Router = express.Router();

Router.get("/article?", NewsController.fetchNews);


export { Router as newsRouter };