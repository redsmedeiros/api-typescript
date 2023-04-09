import productsRouter from '@modules/products/routes/products.routes';
import sessionRouter from '@modules/users/rotas/session.routes';
import userRoutes from '@modules/users/rotas/user.routes';
import { Request, Response, Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', userRoutes);
routes.use('/login', sessionRouter);

export default routes;
