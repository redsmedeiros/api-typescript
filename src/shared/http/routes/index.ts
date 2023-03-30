import productsRouter from '@modules/products/routes/products.routes';
import userRoutes from '@modules/users/rotas/user.routes';
import { Request, Response, Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', userRoutes);

export default routes;
