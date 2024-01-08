import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../database/entities/User";
import { encrypt } from "../helpers/encrypt";
import cache from "memory-cache";

export class UserController {
  static async getUsers(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();

      cache.put("data", users, 6000);
      return res.status(200).json({
        data: users,
      });
    }
  }

  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);
    return res
      .status(200)
      .json({ message: "User created successfully", user });
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    user.name = name;
    user.email = email;
    await userRepository.save(user);
    res.status(200).json({ message: "udpdate", user });
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    await userRepository.remove(user);
    res.status(200).json({ message: "ok" });
  }
}
