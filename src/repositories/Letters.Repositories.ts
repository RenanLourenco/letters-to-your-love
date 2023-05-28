import { AppDataSource } from "../data-source";
import { Letter } from "../entities/Letter";

export const lettersRepo = AppDataSource.getRepository(Letter)