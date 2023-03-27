import "reflect-metadata";
import express from 'express';
import 'express-async-errors';
import routes from './routes';
import { Response, Request, NextFunction } from 'express';
import { AppError } from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(express.json());

app.use(routes);

//middlewares para erros após rotas
app.use((error: Error, req: Request, res: Response, next: NextFunction)=>{

  if( error instanceof AppError){
    res.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  res.status(500).json({
    status: 'error',
    message: 'GLobal error'
  })
})

app.listen(3333, ()=>{
  console.log("servidor rodando na porta 3333");
})
