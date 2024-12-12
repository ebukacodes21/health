"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const accessKey = config_1.default.get("accessTokenPrivateKey");
// sign token
function signToken(payload, options) {
    return jsonwebtoken_1.default.sign(payload, accessKey, options);
}
// verify token
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, accessKey);
        return decoded;
    }
    catch (error) {
        // throw error
        return null;
    }
}
