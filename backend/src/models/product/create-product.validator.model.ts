import { Request, Response, NextFunction } from "express";
import { body, ValidationChain } from "express-validator";
import { bodyValidator } from "../validator.model";

export function createProductValidator(req: Request, res: Response, next: NextFunction) {
    
    let validations: ValidationChain[] = [
        body('name', 'Invalid name or empty').notEmpty().isLength({ max: 20 }),
        body('price')
            .isFloat({ min: 1, max: 5000 }).withMessage("Price is necessary a number and necessary must be between 0 to 5000")
            .notEmpty().withMessage("Price must not be empty"),
        body('category_id')
            .notEmpty().withMessage("Necessary to inform category_id")
    ]

    bodyValidator(req, res, next, validations);
}