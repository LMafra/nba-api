import { Request, Response } from "express";
import fetch from "node-fetch";

export class NewsController {
	static async fetchNews(req: Request, res: Response) {
		const url = "https://nba-stories.onrender.com/articles?";
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Host": "nba-stories.onrender.com",
			},
		};

		const response = await fetch(url, options);
		const data = await response.json();
		res.status(200).json(data);
	}
}
