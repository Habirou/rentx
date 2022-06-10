import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new cars", async () => {
        const car = await createCarUseCase.execute(
            {
                name: "car name",
                description: "car description",
                daily_rate: 566,
                license_plate: "qzeuy",
                fine_amount: 656,
                brand: "car brand",
                category_id: "categori id",
            }
        );

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a new cars whith an exist license_plate", async () => {
       expect(async () => {
        await createCarUseCase.execute(
            {
                name: "car1",
                description: "car description",
                daily_rate: 566,
                license_plate: "qzeuy",
                fine_amount: 656,
                brand: "car brand",
                category_id: "categori id",
            }
        );

        await createCarUseCase.execute(
            {
                name: "car 2",
                description: "car description",
                daily_rate: 566,
                license_plate: "qzeuy",
                fine_amount: 656,
                brand: "car brand",
                category_id: "categori id",
            }
        );
       }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new cars with available true by default", async () => {
        const car = await createCarUseCase.execute(
            {
                name: "car available",
                description: "car description",
                daily_rate: 566,
                license_plate: "qzeuy",
                fine_amount: 656,
                brand: "car brand",
                category_id: "categori id",
            }
        );
        expect(car.available).toBe(true);
    });

})