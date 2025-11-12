import { NextFunction, Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import { bodyValidator } from '../validator.model';

export function addItemValidator(req: Request, res: Response, next: NextFunction) {
    
    let validations: ValidationChain[] = [
        body('amount')
            .notEmpty().withMessage('Necessary to insert an information of amount')
            .isInt({ min: 1, max: 100 }).withMessage("Amount must to be an integer and into this range [1 amount - 100 amounts]")
            .isLength({ min: 1, max: 2 }).withMessage("Amount needs to have two digits"),
        body('order_id').notEmpty().withMessage("Necessary to inform an order id"),
        body('product_id').notEmpty().withMessage("Necessary to inform a product id")
    ]

    bodyValidator(req, res, next, validations);
}