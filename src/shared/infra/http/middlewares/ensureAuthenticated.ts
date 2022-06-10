import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IpayLoad {
    sub: string;
}


export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);

    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, "f968930f67be264f2c1bfb80adf27ba7") as IpayLoad;

        const userRepository = new UsersRepository();
        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError("User doesn't exists", 401);

        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }

}