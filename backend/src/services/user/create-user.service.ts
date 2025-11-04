// Logica de banco de dados

interface UserRequest {
    name: string,
    email: string,
    password: string
}

class CreateUserService {

    async execute({name, email, password}: UserRequest) {
        console.log(name)
        return { OK: true }
    }

}

export { CreateUserService }