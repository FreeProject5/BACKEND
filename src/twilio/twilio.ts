import { config } from "dotenv";
import { Request, Response } from "express";
import twilio from "twilio";

config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = twilio (accountSid, authToken);

export const send_message = async (req: Request, res: Response) => {
    client.messages
    .create({
        body: 'You have successfully registered',
        from: '+12098526986',
        to: '+51968035037'
    })
    .then((message: { sid: any; }) => res.json(message.sid));
}

