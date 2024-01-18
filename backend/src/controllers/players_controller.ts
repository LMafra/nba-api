import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Player } from "../database/entities/Player";
// import { encrypt } from "../helpers/encrypt";
import cache from "memory-cache";

// @ts-ignore
import nba from "nba";

export class PlayerController {

  static async getPlayers(req: Request, res: Response) {
    const result = await nba.stats.teamStats();
    return res.status(200).json({ result });
  }
}