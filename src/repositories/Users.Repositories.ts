
import { DataSource } from "typeorm"
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const userRepo = AppDataSource.getRepository(User)