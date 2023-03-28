import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';

interface IRequest{
  name: string;
  email: string;
  password: string;
  id: string
}

export default class UpdateUserService{

  public async execute({name, email, password, id}: IRequest) : Promise<User>{

    const userRepository = getCustomRepository(UsersRepository);

    const userExists = await userRepository.findById(id);

    if(!userExists){
      throw new AppError('Usuário não encontrado');
    }

    const emailExists = await userRepository.findByEmail(email);

    if(emailExists && email !== userExists.email){
      throw new AppError('Email já cadastrado');
    }

    userExists.name = name;
    userExists.email = email;
    userExists.password = password;

    await userRepository.save(userExists);

    return userExists;

  }
}
