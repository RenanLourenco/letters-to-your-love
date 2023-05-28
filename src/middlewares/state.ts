import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-error'

export const state = (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers['authorization']){
        throw new UnauthorizedError('No token')
    }

    


}