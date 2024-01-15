import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Player } from "../database/entities/Player";
import cache from "memory-cache";

// @ts-ignore
import nba from "nba";

export class PlayerController {
	static async createPlayer(req: Request, res: Response) {
		
		const { name, number, height, weight, team, position, country } = req.body;
		const playerRepository = AppDataSource.getRepository(Player);
		const existingPlayer = await playerRepository.findOne({
			where: {name: name}
		});

		if(!existingPlayer) {
			const player = new Player();
			player.name = name;
			player.number = number;
			player.height = height;
			player.weight = weight;
			player.team = team;
			player.position = position;
			player.country = country;
			await playerRepository.save(player);
			res.status(201).json({
				status: "success",
				data: player,
			});
		} else {
			res.status(404).json({ message: "Jogador já está cadastrado" });
		}
	}
	
	static async getPlayersById(req: Request, res: Response) {
		const playerID = req.params.id;
		const playerRepository = AppDataSource.getRepository(Player);
		try {
			const player = await playerRepository.findOne({
				where: {
					id: playerID,
				},
			});
			
			if (player) {
				return res.status(200).json({ player });
			} else {
				return res.status(404).json({ message: "Jogador não encontrado" });
			}
		} catch (error) {
			console.error("Erro ao buscar jogador:", error);
			return res.status(500).json({ message: "Erro interno do servidor" });
		}
	}

	static async updatePlayer(req: Request, res: Response) {
		const playerID = req.params.id;
		const { name, number, height, weight, team, position, country } = req.body;
		const playerRepository = AppDataSource.getRepository(Player);
		
		const player = await playerRepository.findOne({
			where: {
				id: playerID,
			},
		});
		if (player) {
			player.name = name;
			player.number = number;
			player.height = height;
			player.weight = weight;
			player.team = team;
			player.position = position;
			player.country = country;
			await playerRepository.save(player);
			res.status(200).json({ message: "Jogador encontrado e atualizado com sucesso" });
		} else {
			res.status(404).json({ message: "Jogador não encontrado" });
		}
	}
	
	static async deletePlayer(req: Request, res: Response) {
		const playerID = req.params.id;
		const playerRepository = AppDataSource.getRepository(Player);
		
		const player = await playerRepository.findOne({
			where: {
				id: playerID,
			},
		});
		if (player) {
			await playerRepository.remove(player);
			res.status(200).json({ message: "Jogador encontrado e removido com sucesso" });
			
		} else {
			res.status(404).json({ message: "Jogador não encontrado" });
		}
	}
	
	static async getPlayers(req: Request, res: Response) {
		const teamID = req.params.id;
		const team = await nba.stats.playerInfo({ TeamID: teamID });
		
		res.status(200).json({
			status: "success",
			data: team,
		});
	}
}
