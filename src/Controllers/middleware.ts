import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'clave_secreta_super_segura'; // clave secreta

export const verificacion = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || '';
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ mensaje: 'Token no proporcionado' });
        return;
    }
     const token = authHeader.split(' ')[1]; //Divide el valor en dos partes bearer y token
    try {
     const decoded = jwt.verify(token, JWT_SECRET);
     next();
    } catch (err) {
        res.status(401).json({ mensaje: 'Token inválido o expirado' });
        return;
    }
};