import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token= authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            status: 'access denied',
            message: 'Access denied no token provided',
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
}


export const generateToken = (userData: any) =>{
    return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken};