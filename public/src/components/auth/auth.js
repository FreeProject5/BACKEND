"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_token = exports.generate_token = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const responses_1 = require("../../responses");
dotenv.config();
const JWT_SECRET = process.env.SECRET_KEY;
const generate_token = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "2h" });
};
exports.generate_token = generate_token;
const verify_token = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization)
            return (0, responses_1.failure)({ res, status: 401, message: "Unauthorized" });
        if (!authorization.startsWith("Bearer ")) {
            return (0, responses_1.failure)({ res, status: 401, message: "Token format wrong" });
        }
        const token = authorization.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err)
                return (0, responses_1.failure)({ res, message: "Invalid token" });
            req.headers.token = decoded;
            next();
        });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.verify_token = verify_token;
