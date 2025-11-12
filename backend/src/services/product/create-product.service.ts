import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService {

    async execute({name, price, description, banner, category_id}: ProductRequest) {

        const productExists = await prismaClient.product.findFirst({
            where: {
                name: name
            }
        });

        const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: category_id,
            }
        })

        if (productExists) {
            throw new Error("Product already exist on database!")
        }

        if (!categoryExists) {
            throw new Error("Category dont exist on database!")
        }

        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id
            }
        })

        return product;

    }

}

export { CreateProductService }