import { NextFunction, Request, Response } from 'express'
import { BadRequestError, UnauthorizedError } from '../helpers/api-error'
import jwt from 'jsonwebtoken'
import { userRepo } from '../repositories/Users.Repositories'

interface IDecode {
    id: number,
    email: string,
    name: string
};


type JwtPayload = {
    id:number
}
interface RequestWithUserRole extends Request {
    user?: IDecode,
}
export const state = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if(!authorization){
        throw new UnauthorizedError('Does not have authorization to access this data')
    }
    const token = authorization.split(' ')[1]

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

    const user = await userRepo.findOneBy({ id })

    if(!user){
        throw new BadRequestError('Autentication failed, try again!')
    }
    
    req.user = {
        id: user.id,
        email: user.email,
        name: user.name
    }

    next()
}