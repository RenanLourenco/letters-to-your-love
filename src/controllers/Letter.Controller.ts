import { Response, Request } from "express";
import { lettersRepo } from "../repositories/Letters.Repositories";
import { userRepo } from "../repositories/Users.Repositories";

interface IDecode {
    id: number,
    email: string,
    name: string,
    password: string
  };

  interface RequestWithUserRole extends Request {
    user?: IDecode,
}
export class LetterController {

    async create(req: RequestWithUserRole, res: Response){
        const { text, receiver } = req.body
        const user = req.user

        let findReceiver =  await userRepo.findOneBy({email: receiver})
        
        const { password: _, ...userReceiver } = <IDecode> findReceiver;

        if(!text){
            return res.status(400).send({msg:"Need text to send the letter"})
        }

        try {
            const newLetter = lettersRepo.create({
                text,
                sender:user,
                receiver: userReceiver
            })
            
            await lettersRepo.save(newLetter)

            return res.status(200).json(newLetter)

        } catch (error) {
            return res.status(500).json(error)
        }

    }

    async getLetters(req: RequestWithUserRole, res:Response) {
        const user = req.user
        const lettersSend = await lettersRepo.find({
            where:{sender:{ id: user?.id}}
        })

        const lettersReceived = await lettersRepo.find({
            where:{receiver:{ id: user?.id}}
        })

        return res.status(200).json({send: lettersSend, received: lettersReceived})
    }




}