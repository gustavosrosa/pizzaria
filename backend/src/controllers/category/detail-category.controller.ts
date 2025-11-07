import { Request, Response } from "express";
import { DetailCategoryService } from "../../services/category/detail-category.service";

class DetailCategoryController {

    async handle(req: Request, res: Response) {

        const detailCategoryService = new DetailCategoryService();
        const categories = await detailCategoryService.execute();

        return res.json(categories);

    }

}

export { DetailCategoryController }