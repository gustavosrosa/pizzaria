import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export async function bodyValidator(req: Request, res: Response, next: NextFunction, validators: ValidationChain[]) {

    await Promise.all(validators.map(validator => validator.run(req)));

    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg 
        });
    }

    return next();
}