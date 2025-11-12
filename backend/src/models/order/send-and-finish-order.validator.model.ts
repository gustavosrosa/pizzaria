import { Request, Response, NextFunction } from "express";
import { body, ValidationChain } from "express-validator";
import { bodyValidator } from "../validator.model";

export function sendAndFinishOrderValidator(req: Request, res: Response, next: NextFunction) {
    
    let validations: ValidationChain[] = [
        body('order_id').notEmpty().withMessage("Necessary to inform an order id"),
    ]

    bodyValidator(req, res, next, validations);
}