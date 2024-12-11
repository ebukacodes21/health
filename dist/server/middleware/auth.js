"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuth = void 0;
const jwt_1 = require("../utils/jwt");
// authentication guard to protect desired routes
const isAuth = (req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        if (!authToken || !authToken.startsWith("Bearer ")) {
            throw new Error("Missing patient authorization token");
        }
        const token = authToken.split(" ")[1].trim();
        const patient = (0, jwt_1.verifyToken)(token);
        if (!patient) {
            throw new Error("Invalid/Expired patient token");
        }
        res.locals = patient;
        next();
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
exports.isAuth = isAuth;
const isAdmin = (req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        if (!authToken || !authToken.startsWith("Bearer ")) {
            throw new Error("Missing patient authorization token");
        }
        const token = authToken.split(" ")[1].trim();
        const patient = (0, jwt_1.verifyToken)(token);
        if (!patient) {
            throw new Error("Invalid/Expired patient token");
        }
        if (patient.role !== "admin") {
            throw new Error("unauthorized to access route. not an admin.");
        }
        res.locals = patient;
        next();
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
exports.isAdmin = isAdmin;
