
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/AppErrors";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject(UsersRepository)
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name, 
        email, 
        password, 
        driver_licence,
    }: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User Already Exist");
            
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_licence,
        });
    }
}


export { CreateUserUseCase };