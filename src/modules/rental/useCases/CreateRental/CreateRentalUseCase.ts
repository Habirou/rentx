import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppErrors";


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {

    constructor(
        private rentalsRepository: IRentalsRepository
    ){}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<void> {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError("Car is anavailable");
            
        }

        const userWithRentalsOpned = this.rentalsRepository.findOpenRentalByUser(user_id);

        if (userWithRentalsOpned) {
            throw new AppError("There is a rental in progress for this user");
            
        }
    }

}

export { CreateRentalUseCase };