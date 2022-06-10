import { AppError } from "@shared/errors/AppErrors";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject(SpecificationRepository)
        private specificationRepository: ISpecificationRepository) {}

    async execute({ description, name }: IRequest): Promise<void> {

        const specificationAlreadyExist = await this.specificationRepository.findByName(
            name
        );

        if (specificationAlreadyExist) {
            throw new AppError("Specification Already Exists");
        }

        await this.specificationRepository.create({ 
            name, 
            description 
        });

    }
}

export { CreateSpecificationUseCase };