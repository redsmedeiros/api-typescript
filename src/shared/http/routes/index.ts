import productsRouter from '@modules/products/routes/products.routes';
import { Request, Response, Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter)

routes.get('/', (req: Request, res: Response)=>{

  res.json({
    message: 'teste'
  })
})

export default routes;
