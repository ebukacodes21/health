import jwt from 'jsonwebtoken'
import { PatientType } from '../types/types';

const accessKey = process.env.ACCESS_TOKEN_PRIVATE_KEY!;

// sign token
export function signToken(payload: PatientType, options: jwt.SignOptions) {
    return jwt.sign(payload, accessKey, options)
}

// verify token
export function verifyToken<T>(token: string): T | null {
    try {
        const decoded = jwt.verify(token, accessKey);
        return decoded as T;
    } catch (error) {
        // throw error
        return null
    }
}