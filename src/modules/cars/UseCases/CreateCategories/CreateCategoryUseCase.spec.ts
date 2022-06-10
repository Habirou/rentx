import { CatregoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CatregoriesRepositoryInMemory;

describe("Criar Categorias", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CatregoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("Should be able to create a new category", async () => {
        
        const category = {
            name: "test of category",
            description: "category description",
        }
       
        await createCategoryUseCase.execute({
           name: category.name,
           description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
        expect(categoryCreated).toHaveProperty("id");
    });
});