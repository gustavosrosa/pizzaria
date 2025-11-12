import prismaClient from "../../prisma";

class ListOrdersService {

    async execute() {

        const orders = await prismaClient.order.findMany({
            where: {
                status: false,
                draft: false,
            },
            orderBy: {
                created_at: 'desc', // Order by first created orders
            }
        });

        return orders;

    }

}

export { ListOrdersService };