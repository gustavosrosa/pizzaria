import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class FinishOrderService {
    async execute({ order_id }: OrderRequest) {

        const orderExists = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            },
        });

        if (!orderExists) {
            throw new Error("Order id do not exist in database!");
        }

        const order = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: {
                status: true,
            }
        });

        return order;
    }
}
export { FinishOrderService };