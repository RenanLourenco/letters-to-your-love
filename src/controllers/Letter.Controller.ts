import { Response, Request } from "express";
import { lettersRepo } from "../repositories/Letters.Repositories";

export class LetterController {

    async create(req: Request, res: Response){
        const { text } = req.body

        if(!text){
            return res.status(400).send({msg:"Need text to send the letter"})
        }

        try {
            const newLetter = lettersRepo.create({
                text,
            })
            
            await lettersRepo.save(newLetter)

            return res.status(200).json(newLetter)

        } catch (error) {
            return res.status(500).json(error)
        }


         

    }




}