import { NextFunction, Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import { bodyValidator } from '../validator.model';

export function createCategoryValidator(req: Request, res: Response, next: NextFunction) {
    
    let validations: ValidationChain[] = [
        body('name', 'Invalid name or empty').notEmpty().isLength({ max: 20 }),
    ]

    bodyValidator(req, res, next, validations);
}