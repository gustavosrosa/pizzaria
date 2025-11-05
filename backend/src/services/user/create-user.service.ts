// Logica de banco de dados
import prismaClient from "../../prisma/index"

interface UserRequest {
    name: string,
    email: string,
    password: string
}

class CreateUserService {

    async execute({name, email, password}: UserRequest) {
        
        // Verificar se enviou um email
        if (!email) {
            throw new Error("Invalid email!");
        }

        // Verificar se o email ja consta na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: password
            },
            select: { // O que devolver
                id: true,
                email: true,
                name: true
            }
        })

        return user;

    }

}

export { CreateUserService }