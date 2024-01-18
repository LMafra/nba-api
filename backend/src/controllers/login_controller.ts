import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../database/entities/User";
import { BadRequestError } from "../helpers/api_erros";
import jwt from "jsonwebtoken"

type JwtPayload = {
    id: string
}

export class LoginController{
    static async login(req: Request, res: Response){
        const {email, password} = req.body;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({email});
        const userPass = await userRepository.findOneBy({password});

        if(!user){
            throw new BadRequestError('E-mail ou senha invalidos')
        }

        if(!userPass.password){
            throw new BadRequestError('E-mail ou senha invalidos')
        }

        const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: '8h'})

        const {password:_, ...userLogin} = user
        return res.json(
            {
               user: userLogin,
               token: token
            }
        )
    }

}
