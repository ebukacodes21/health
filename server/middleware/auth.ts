import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { PatientType } from "../types/types";

// authentication guard to protect desired routes
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization;
        if (!authToken || !authToken.startsWith("Bearer ")) {
            throw new Error("Missing patient authorization token");
        }

        const token = authToken.split(" ")[1].trim();
        const patient = verifyToken(token) as PatientType;
        if (!patient) {
            throw new Error("Invalid/Expired patient token");
        }

        res.locals = patient;
        next();
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization;
        if (!authToken || !authToken.startsWith("Bearer ")) {
            throw new Error("Missing patient authorization token");
        }

        const token = authToken.split(" ")[1].trim();
        const patient = verifyToken(token) as PatientType;
        if (!patient) {
            throw new Error("Invalid/Expired patient token");
        }

        if(patient.role !== "admin"){
            throw new Error("unauthorized to access route. not an admin.");
        }

        res.locals = patient;
        next();
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};
