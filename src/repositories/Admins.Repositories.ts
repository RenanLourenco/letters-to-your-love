
import { AppDataSource } from "../data-source";
import { Admin } from "../entities/Admin";

export const adminRepo = AppDataSource.getRepository(Admin)