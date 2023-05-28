import { Router } from "express";
import { LetterController } from "../controllers/Letter.Controller";
import { state } from "../middlewares/state";

const letters = Router()

letters.post('/send',state, new LetterController().create)
letters.get('/list',state, new LetterController().getLetters)



export default letters

