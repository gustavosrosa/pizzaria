import prismaClient from "../../prisma"

class DetailUserService {

    async execute() {
       return { OK: true }; 
    }

}

export { DetailUserService }