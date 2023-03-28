import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest{
  id : string;
}

  export default class ShowUserService{

    public async execute({ id }: IRequest): Promise<User>{

      const userRepository = getCustomRepository(UsersRepository);

      const user = await userRepository.findById(id);

      if(!user){
        throw new AppError("Usuário não encontrado");
      }

      return user;

    }
  }
