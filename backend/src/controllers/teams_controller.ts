import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Teams } from "../database/entities/Teams";
import cache from "memory-cache";

// @ts-ignore
import nba from "nba";

export class TeamsController {
    static async getTeams(req: Request, res: Response) {
        const data = cache.get("data");
        if (data) {
          console.log("serving from cache");
          return res.status(200).json({
            data,
          });
        } else {
          console.log("serving from db");
          const teamsRepository = AppDataSource.getRepository(Teams);
          const teams = await teamsRepository.find();
    
          cache.put("data", teams, 6000);
          return res.status(200).json({
            data: teams,
          });
        }
      }

      static async getTeamById(req: Request, res: Response) {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Invalid team ID' });
        }
        const teamRepository = AppDataSource.getRepository(Teams);

        try {
            const team = await teamRepository.findOne({
                where: {id}
            });

            if (!id) {
                return res.status(404).json({ message: 'Team not found' });
            }
            return res.status(200).json({ team });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async createTeam(req: Request, res: Response) {
        const { abbreviation, name, location } = req.body;

        const teamRepository = AppDataSource.getRepository(Teams);
        const existingTeam = await teamRepository.findOne({
            where: { name }
         });

        if (existingTeam) {
        return res
            .status(400)
            .json({ message: "Team with the same name already exists" });
        } else{
            const team = new Teams();
            team.abbreviation = abbreviation;
            team.name = name;
            team.location = location;
            await teamRepository.save(team);
            return res
            .status(200)
            .json({ message: "team created successfully", team });
        }
    }

    static async updateTeam(req: Request, res: Response){
        const {id} = req.params;
        const {abbreviation, name, location} = req.body
        const teamRepository = AppDataSource.getRepository(Teams);
        const team = await teamRepository.findOne({
            where: {id}
        });
        team.abbreviation = abbreviation;
        team.name = name;
        team.location = location;
        await teamRepository.save(team);
        res.status(200).json({ message: "udpdate", team });
    }

    static async deleteTeam(req: Request, res: Response){
        const {id} = req.params;
        const teamRepository = AppDataSource.getRepository(Teams);
        const team = await teamRepository.findOne({
            where: {id}
        });
        await teamRepository.remove(team);
        res.status(200).json({message: "ok"})
    }

    static async getTeam(req: Request, res: Response){
        const data = await nba.stats.teamStats();
        return res.status(200).json({data});
    }

};
