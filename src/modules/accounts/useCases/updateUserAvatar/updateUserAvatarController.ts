import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpadateUserAvatarUseCase } from "./updateUserAvatarUseCase";


class UpadateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
       const { id } = request.user;
       const avatar_file = request.file.filename;

       const upadateUserAvatarUseCase = container.resolve(UpadateUserAvatarUseCase);

       await upadateUserAvatarUseCase.execute({user_id: id, avatar_file});

       return response.status(204).send();
    }
}

export { UpadateUserAvatarController };