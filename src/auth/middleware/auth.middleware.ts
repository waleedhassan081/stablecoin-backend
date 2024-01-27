import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token) {
            try {
                const decoded = this.jwtService.verify(token);
                req['user'] = decoded;
                next();
            } catch (error) {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized access', statusCode: HttpStatus.UNAUTHORIZED });
            }
        } else {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized access', statusCode: HttpStatus.UNAUTHORIZED });
        }
    }
}
