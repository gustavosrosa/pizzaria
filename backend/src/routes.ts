import { Router, type Request, type Response } from 'express';
import { CreateUserController } from './controllers/user/create-user.controller';
import { AuthUserController } from './controllers/user/auth-user.controller';

const router = Router();

/** Rotas user */
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

export { router };