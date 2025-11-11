import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from './controllers/user/create-user.controller';
import { AuthUserController } from './controllers/user/auth-user.controller';
import { DetailUserController } from './controllers/user/detail-user.controller';
import { isAuthenticated } from './middlewares/is-authenticated.middleware';
import { DetailCategoryController } from './controllers/category/detail-category.controller';
import { CreateProductController } from './controllers/product/create-product.controller';
import uploadConfig from './config/multer'
import { ListByCategoryController } from './controllers/product/list-by-category.controller';
import { CreateOrderController } from './controllers/order/create-order.controller';

const router = Router();

/** Multer */
const upload = multer(uploadConfig.upload("./tmp"));

const PRODUCT = 'product';

/** Routes user */
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle); // Middleware - Before call the controller

/** Routes categories */
router.get("/categories", isAuthenticated, new DetailCategoryController().handle);

/** Routes products  */
router.post(`/${PRODUCT}`, isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get(`/category/${PRODUCT}`, isAuthenticated, new ListByCategoryController().handle);

/** Routes orders */
router.post('/order', isAuthenticated, new CreateOrderController().handle);

export { router };