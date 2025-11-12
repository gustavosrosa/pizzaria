import { Request, Response, NextFunction } from "express";
import { body, ValidationChain } from "express-validator";
import { bodyValidator } from "../validator.model";

export function authUserValidator(req: Request, res: Response, next: NextFunction) {
    
    let validations: ValidationChain[] = [
        body('email')
            .notEmpty().withMessage("Necessary to inform email")
            .isEmail().withMessage("The type email is necessary to be an email [XPTO@xpto.com]"),
        body('password')
            .isLength({ min: 8, max: 25 }).withMessage('Necessary to inform a password between 8 to 25 characters')
            .notEmpty().withMessage('Necessary to inform a password')
            .isStrongPassword().withMessage('Necessary to create a strong password')
    ]

    bodyValidator(req, res, next, validations);
}