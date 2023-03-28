import { AppError } from './../../../shared/errors/AppError';
import  {getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User  from '../typeorm/entities/User'

interface IRequest{
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService{

  public async execute({ name, email, password }: IRequest): Promise<User>{

    const userRepository = getCustomRepository(UsersRepository);

    const userExists = await userRepository.findByEmail(email);

    if(userExists){
      throw new AppError('Email já cadastrado');
    }

    const createdUser = await userRepository.create({
      name,
      email,
      password
    });

    await userRepository.save(createdUser);

    return createdUser;
  }
}
