import { Response, Request } from "express";
import { userRepo } from "../repositories/Users.Repositories";
import { BadRequestError } from "../helpers/api-error";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserController {
    async create(req: Request, res: Response){
        const { name, email, password } = req.body

        if(!name || !email || !password){
            throw new BadRequestError('Invalid data')
        }

        const userExists = await userRepo.findOneBy({email})

        if(userExists){
            throw new BadRequestError('Email already exists')
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = userRepo.create({
            name,
            email,
            password:hashpassword
        })

        await userRepo.save(newUser)

        return res.status(200).json(newUser)
      
    }
    async login(req: Request, res: Response){
        const {email, password} = req.body

        const user = await userRepo.findOneBy({email})

        if(!user){
            throw new BadRequestError('User does not exist exists')
        }

        const verifyPass = await bcrypt.compare(password, user.password)

        if(!verifyPass){
            throw new BadRequestError('Invalid email or password')
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '', {
            expiresIn:'1d'
        })

        const {password: _, ...userLogin } = user
        
        return res.json({
            user: userLogin,
            token,
        })

    }

}