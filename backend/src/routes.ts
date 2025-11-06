import { Router, type Request, type Response } from 'express';
import { CreateUserController } from './controllers/user/create-user.controller';
import { AuthUserController } from './controllers/user/auth-user.controller';
import { DetailUserController } from './controllers/user/detail-user.controller';
import { isAuthenticated } from './middlewares/is-authenticated.middleware';

const router = Router();

/** Rotas user */
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated , new DetailUserController().handle); // Middleware - Before call the controller

export { router };