import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'

interface AuthRequest {
    email: string,
    password: string
}

class AuthUserService {

    async execute({email, password}: AuthRequest) {

        const INC_PASSWORD = "User/password incorrect!";

        // Verify if email exists
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error(INC_PASSWORD);
        }

        // verify if password matches
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error(INC_PASSWORD);
        }

        // generate jwt token and using to login

        

    }

}

export { AuthUserService };