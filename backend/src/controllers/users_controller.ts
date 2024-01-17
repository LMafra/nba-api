import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../database/entities/User";
import { encrypt } from "../helpers/encrypt";
import cache from "memory-cache";

export class UserController {
  static async getUsers(req: Request, res: Response) {
    const data = cache.get("data");

    const logMessage = `[UserController] Getting Users from ${data ? 'cache' : 'DB'}`;
    console.log(logMessage);

    try {
      if (data) {
        return res.status(200).json({
          message: 'Users retrieved from cache successfully',
          data,
        });
      } else {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        cache.put("data", users, 6000);
        return res.status(200).json({
          message: 'Users retrieved from DB successfully',
          data: users,
        });
      }
    } catch (error: any) {
      console.error('[UserController] Error in getUsers:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    const userRepository = AppDataSource.getRepository(User);

    try {
      await userRepository.save(user);
      console.log("[UserController] User created successfully")
      return res.status(200).json({
        message: "User created successfully",
        user,
      });
    } catch (error: any) {
      console.error('[UserController] Error in createUser:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    try {
      const user = await userRepository.findOne({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.name = name;
      user.email = email;
      await userRepository.save(user);

      return res.status(200).json({ message: "User updated successfully", user });
    } catch (error: any) {
      console.error('[UserController] Error in updateUser:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);

    try {
      const user = await userRepository.findOne({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await userRepository.remove(user);

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      console.error('[UserController] Error in deleteUser:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
