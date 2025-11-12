import { NextFunction, Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import { bodyValidator } from '../validator.model';

export function createOrderValidator(req: Request, res: Response, next: NextFunction) {
    
    let validations: ValidationChain[] = [
        body('table')
            .notEmpty().withMessage('Necessary to insert an information of table')
            .isInt({ min: 1, max: 100 }).withMessage("Table must to be an integer and into this range [1 table - 100 tables]")
            .isLength({ min: 1, max: 2 }).withMessage("Table needs to have two digits"),
        body('name')
            .notEmpty().withMessage("Necessary to inform a name")
            .isLength({ min: 1, max: 20 }).withMessage("Necessary to inform a password between 1 to 20 characters")
    ]

    bodyValidator(req, res, next, validations);
}