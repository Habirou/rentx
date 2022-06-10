import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository{
  
    cars: Car[] = [];
    async create({
        name, 
        description, 
        daily_rate, 
        license_plate, 
        fine_amount, 
        brand, 
        category_id,
        specification,
        id
    }: ICreateCarDTO): Promise<Car> {
        const  car = new Car();

        Object.assign(car,{
            name, 
            description, 
            daily_rate, 
            license_plate, 
            fine_amount, 
            brand, 
            category_id,
            specification,
            id
        });

        this.cars.push(car);
        return car;
    }

    async findByLicensePlate(licence_plate: string): Promise<Car> {
       return this.cars.find((car) => licence_plate === car.license_plate);
    }

    async findAvailable(
        brand?: string, 
        category_id?: string, 
        name?: string
    ): Promise<Car[]> {
        const cars = this.cars.filter((car) => {
            if(car.available === true || (
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name))
            ){
                return car;
            }
            return null;
        });
       
        return cars;
    }

    async findbyId(car_id: string): Promise<Car> {
        const car = await this.cars.find((car) => car.id === car_id);
        return car;
    }

}

export { CarsRepositoryInMemory };