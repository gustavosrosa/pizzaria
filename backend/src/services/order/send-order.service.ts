import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class SendOrderService {
    
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
                draft: false,
            },
        });

        return order;

    }

}

export { SendOrderService };