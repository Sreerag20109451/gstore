import { log } from "console";
import * as dotenv from "dotenv";



dotenv.config()


console.log(process.env.GOOGLE_SECRET!!);
console.log(process.env.GOOGLE_CLIENT!!);

