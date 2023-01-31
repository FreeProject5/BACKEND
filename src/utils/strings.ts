import { createHmac } from "node:crypto";
import * as dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY

export function hash_password(password: string): string {
    return createHmac("sha256", SECRET_KEY as string).update(password).digest("hex")
}

export function compare_password(password: string, checkpassword: string): boolean{
    return password === hash_password(checkpassword)
}