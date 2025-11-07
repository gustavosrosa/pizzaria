import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from './controllers/user/create-user.controller';
import { AuthUserController } from './controllers/user/auth-user.controller';
import { DetailUserController } from './controllers/user/detail-user.controller';
import { isAuthenticated } from './middlewares/is-authenticated.middleware';
import { DetailCategoryController } from './controllers/category/detail-category.controller';
import { CreateProductController } from './controllers/product/create-product.controller';
import uploadConfig from './config/multer'

const router = Router();

/** Multer */
const upload = multer(uploadConfig.upload("./tmp"));

/** Routes user */
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle); // Middleware - Before call the controller

/** Routes categories */
router.get("/categories", isAuthenticated, new DetailCategoryController().handle);

/** Routes products  */
router.post("/product", isAuthenticated, upload.single('file'), new CreateProductController().handle);

export { router };