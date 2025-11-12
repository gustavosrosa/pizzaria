import prismaClient from "../../prisma";

interface DetailRequest {
    order_id: string;
}

class DetailOrderService {

    async execute({ order_id }: DetailRequest) {
        const orders = await prismaClient.item.findMany({
            where: {
                order_id: order_id,
            },
            // Relation with order and product (foreign key)
            include: { // Use include to get the parameters of another relationship
                product: true, // Return the product with the relationship
                order: true, // Return the order with the relationship
            }
        });

        return orders;
    }

}

export { DetailOrderService }