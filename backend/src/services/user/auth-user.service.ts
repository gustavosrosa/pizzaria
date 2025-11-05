import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string,
    password: string
}

class AuthUserService {

    async execute({ email, password }: AuthRequest) {

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

        // verify if password matches: yarn add bcryptjs / yarn add @types/bcryptjs -D
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error(INC_PASSWORD);
        }

        // generate jwt token and using to login - yarn add jsonwebtoken / yarn add @types/jsonwebtoken -D
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }

    }

}

export { AuthUserService };