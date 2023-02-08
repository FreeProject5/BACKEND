import { config } from "dotenv";
import { Request, Response } from "express";
import twilio from "twilio";

config();

const ACcountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = twilio (ACcountSid, authToken);

export const send_message = async (req: Request, res: Response) => {
    const phoneNumber = req.body.phone;
    const name = req.body.firstname;
    client.messages
    .create({
        body: `${name} you have successfully registered`,
        from: '+12098526986',
        to: `+51${phoneNumber}`,
    })
    .then((message: { sid: any; }) => res.json(message.sid));
}

