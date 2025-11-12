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
import { RemoveOrderController } from './controllers/order/remove-order.controller';
import { AddItemController } from './controllers/order/add-item.controller';
import { CreateCategoryController } from './controllers/category/create-category.controller';
import { RemoveItemController } from './controllers/order/remove-item.controller';
import { SendOrderController } from './controllers/order/send-order.controller';
import { ListOrdersController } from './controllers/order/list-orders.controller';
import { DetailOrderController } from './controllers/order/detail-order.controller';
import { FinishOrderController } from './controllers/order/finish-order.controller';
import { createCategoryValidator } from './models/category/create-category.validator.model';
import { createProductValidator } from './models/product/create-product.validator.model';
import { createUserValidator } from './models/user/create-user.validator.model';
import { authUserValidator } from './models/user/auth-user.validator.model';
import { createOrderValidator } from './models/order/create-order.validation.model';

const router = Router();

/** Multer */
const upload = multer(uploadConfig.upload("./tmp"));

const PRODUCT = 'product';
const ORDER = 'order';
const CATEGORY = 'category';

/** Routes user */
router.post('/users', createUserValidator, new CreateUserController().handle);
router.post('/session', authUserValidator, new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle); // Middleware - Before call the controller

/** Routes categories */
router.get(`/${CATEGORY}`, isAuthenticated, new DetailCategoryController().handle);
router.post(`/${CATEGORY}`, isAuthenticated, createCategoryValidator, new CreateCategoryController().handle);

/** Routes products */
router.post(`/${PRODUCT}`, isAuthenticated, upload.single('file'), createProductValidator, new CreateProductController().handle);
router.get(`/${CATEGORY}/${PRODUCT}`, isAuthenticated, new ListByCategoryController().handle);

/** Routes orders */
router.post(`/${ORDER}`, isAuthenticated, createOrderValidator, new CreateOrderController().handle);
router.delete(`/${ORDER}`, isAuthenticated, new RemoveOrderController().handle);
router.post(`/${ORDER}/add`, isAuthenticated, new AddItemController().handle);
router.delete(`/${ORDER}/remove`, isAuthenticated, new RemoveItemController().handle);
router.put(`/${ORDER}/send`, isAuthenticated, new SendOrderController().handle);
router.get('/orders', isAuthenticated, new ListOrdersController().handle);
router.get(`/${ORDER}/detail`, isAuthenticated, new DetailOrderController().handle);
router.put(`/${ORDER}/finish`, isAuthenticated, new FinishOrderController().handle);

export { router };