import { AppError } from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import Auth from '@config/Auth';

interface TokenPayLoad{
  iat: number;
  exp: string;
  sub: string;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {

  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new AppError('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try{

    const decodeToken = verify(token, Auth.jwt.secret);

    const { sub } = decodeToken as unknown as TokenPayLoad;

    req.user = {
      id: sub
    }

    return next();
  }catch{

    throw new AppError('Invalid token');
  }


}
