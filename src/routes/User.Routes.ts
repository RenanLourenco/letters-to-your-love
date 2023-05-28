import { Request, Response, Router } from "express";
import { UserController } from "../controllers/User.Controller";

const users = Router()

users.post('/register', new UserController().create)
users.post('/login', new UserController().login)


export default users

