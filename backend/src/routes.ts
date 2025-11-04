import { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/user/create-user.controller';

const router = Router();

/** Rotas user */
router.post('/users', new CreateUserController().handle);

export { router };