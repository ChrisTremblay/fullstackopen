//DOTENV//
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

export { MONGO_URL, PORT };
