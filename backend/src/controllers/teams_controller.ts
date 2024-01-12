import { Request, Response, response } from "express";
import { AppDataSource } from "../data-source";
import { Teams } from "../database/entities/Teams";
import cache from "memory-cache";

// @ts-ignore
import nba from "nba";

// export class TeamsController {

//     static async getTeams(req: Request, res: Response){
//         const data = await nba.stats.teamStats();
//         return res.status(200).json({data});
//     }

//     static async getTeam(req: Request, res: Response) {
//         const teamId = req.params.id;
//         const teamRepository = nba.stats.teamStats();
//         const team = await teamRepository.findOne({
//             id: teamId
//         });
//         res.status(200).json({ team });
//     }
// };

export class TeamsController {

    static async getTeam(req: Request, res: Response) {
        const teamId = req.params.id;
        const teamRepository = AppDataSource.getRepository(Teams); // Use o repositório do TypeORM

        try {
            const team = await teamRepository.findOne({
                where: {
                    id: teamId,
                },
            });

            if (team) {
                return res.status(200).json({ team });
            } else {
                return res.status(404).json({ message: 'Time não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao buscar time:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    static async createTeam(req: Request, res: Response) {
        try {
            const response = await nba.stats.teamStats();
            const team = new Teams();
            team.id= response.teamId;
            team.name= response.teamName;
            const teamRepository = AppDataSource.getRepository(Teams);
            await teamRepository.save(
                team
            );

            res.json(team);
        } catch (error) {
            console.error('Erro ao salvar time:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    
}