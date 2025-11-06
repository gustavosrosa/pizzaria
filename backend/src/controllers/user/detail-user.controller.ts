import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/detail-user.service";

class DetailUserController {
    
    async handle(req: Request, res: Response) {
        const detailUserService = new DetailUserService();

        const user = await detailUserService.execute();

        return res.json(user);
    }

}

export { DetailUserController }