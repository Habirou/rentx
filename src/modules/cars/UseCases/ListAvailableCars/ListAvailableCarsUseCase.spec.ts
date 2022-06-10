import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);

    });

    it("Should be able to list cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car ",
            description: "car description",
            daily_rate: 566,
            license_plate: "uripf",
            fine_amount: 656,
            brand: "car brand",
            category_id: "categori id",
        });
    
        const cars = await listAvailableCarsUseCase.execute({});
        
        expect(cars).toEqual([car]);
    });

    it("Should be able to list cars by name, brand or id", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car ",
            description: "car description",
            daily_rate: 566,
            license_plate: "uripf",
            fine_amount: 656,
            brand: "car_brand_test",
            category_id: "categori id",
        });
    
        const cars = await listAvailableCarsUseCase.execute({
            brand: "car_brand_test",
        });

        expect(cars).toEqual([car]);
    });

})