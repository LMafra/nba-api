import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Player } from "../database/entities/Player";
// import { encrypt } from "../helpers/encrypt";
import cache from "memory-cache";

import nba from "nba-api-client";

export class PlayerController {

  static async getPlayers(req: Request, res: Response) {
    
    const result = nba.allPlayersList()
    res.status(200).json(result);
   }
}    
