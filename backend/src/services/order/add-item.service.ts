import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemService {
    async execute({ order_id, product_id, amount }: ItemRequest) {

        const orderIdExists = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            },
        });

        if (!orderIdExists) {
            throw new Error("Order id do not exist in database!");
        }

        const productIdExists = await prismaClient.product.findFirst({
            where: {
                id: product_id,
            },
        });

        if (!productIdExists) {
            throw new Error("Product id do not exist in database!");
        }

        const order = await prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                amount: amount
            },
        });

        return order;

    }
}

export { AddItemService };