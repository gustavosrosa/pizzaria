import prismaClient from "../../prisma"
import { StringUtil } from "../../utils/string.util";

interface Category {
    name: string;
}

class CreateCategoryService {

    async execute({name}: Category) {

        if (StringUtil.isStringNullOrEmpty(name)) {
            throw new Error("Name must not be null");
        }

        const categoryExists = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        });

        if (categoryExists) {
            throw new Error("Category already exists");
        }

        const category = await prismaClient.category.create({
            data: {
                name: name
            },
            select: {
                id: true,
                name: true,
            }
        })

        return category;
    }

}

export { CreateCategoryService }