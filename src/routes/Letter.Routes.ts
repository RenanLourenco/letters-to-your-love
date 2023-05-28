import { Request, Response, Router } from "express";
import { LetterController } from "../controllers/Letter.Controller";

const letters = Router()

letters.post('/send', new LetterController().create)



export default letters

