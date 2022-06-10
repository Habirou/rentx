import { AppError } from "@shared/errors/AppErrors";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoryRepository) {}

    async execute({ description, name }: IRequest): Promise<void> {

        const categoryAlreadyExist = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExist) {
            throw new AppError("Category Already Exists");
        }

        this.categoriesRepository.create({ name, description });

    }
}

export { CreateCategoryUseCase };