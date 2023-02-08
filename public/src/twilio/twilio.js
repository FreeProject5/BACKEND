"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send_message = void 0;
const dotenv_1 = require("dotenv");
const twilio_1 = __importDefault(require("twilio"));
(0, dotenv_1.config)();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = (0, twilio_1.default)(accountSid, authToken);
const send_message = async (req, res) => {
    const phoneNumber = req.body.phone;
    const name = req.body.firstname;
    client.messages
        .create({
        body: `${name} you have successfully registered`,
        from: '+12098526986',
        to: `+51${phoneNumber}`,
    })
        .then((message) => res.json(message.sid));
};
exports.send_message = send_message;
