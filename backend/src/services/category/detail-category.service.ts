import prismaClient from "../../prisma" 
import { Category } from "./create-category.service";

class DetailCategoryService {

    async execute() {

        const categories: Category[] = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
            }
        });

        return categories;

    }

}

export { DetailCategoryService }