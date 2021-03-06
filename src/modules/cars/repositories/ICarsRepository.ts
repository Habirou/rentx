import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(licence_plate: string): Promise<Car>;
    findAvailable(
        brand?: string, 
        category_id?: string, 
        name?: string
    ): Promise<Car[]>;
    findbyId(car_id: string): Promise<Car>;
}

export { ICarsRepository };