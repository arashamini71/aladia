import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const token =
      req.cookies?.jwt || req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req['user'] = payload; // attach user info
      next();
    } catch (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }
  }
}
