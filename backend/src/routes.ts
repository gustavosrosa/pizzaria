import { Router } from 'express';
import { CreateUserController } from './controllers/user/create-user.controller';
import { AuthUserController } from './controllers/user/auth-user.controller';
import { DetailUserController } from './controllers/user/detail-user.controller';
import { isAuthenticated } from './middlewares/is-authenticated.middleware';
import { DetailCategoryController } from './controllers/categories/detail-category.controller';
import { CreateProductController } from './controllers/product/create-product.controller';

const router = Router();

/** Routes user */
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle); // Middleware - Before call the controller

/** Routes categories */
router.get("/categories", isAuthenticated, new DetailCategoryController().handle);

/** Routes products  */
router.post("/product", isAuthenticated, new CreateProductController().handle);


export { router };