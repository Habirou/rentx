import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";
import { SpecificationReposiryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationReposiryInMemory: SpecificationReposiryInMemory;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationReposiryInMemory = new SpecificationReposiryInMemory;
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationReposiryInMemory
        );
    });    

    it("Sould not be able to add new specification to a nan exist car", async () => {
        expect( async () => {
            const car_id = "1234";
            const specification_id = ["123456"];
            
            await createCarSpecificationUseCase.execute({car_id, specification_id});
    
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Sould be able to add new specification to a car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car ",
            description: "car description",
            daily_rate: 566,
            license_plate: "uripf",
            fine_amount: 656,
            brand: "car brand",
            category_id: "categori id",
        });

        const specificationNovo = await specificationReposiryInMemory.create({
            description: "test",
            name: "teste name"
        });

        const specification_id = [specificationNovo.id];

        const specificationCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specification_id,
        });

        expect(specificationCars).toHaveProperty("specification");
        expect(specificationCars.specification.length).toBe(1);
    });

});