import { AppError } from './../../../shared/errors/AppError';
import  {getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User  from '../typeorm/entities/User'
import bcrypt from 'bcryptjs';

interface IRequest{
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export default class CreateUserService{

  public async execute({ name, email, password, avatar }: IRequest): Promise<User>{

    const userRepository = getCustomRepository(UsersRepository);

    const userExists = await userRepository.findByEmail(email);

    if(userExists){
      throw new AppError('Email já cadastrado');
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar
    });

    await userRepository.save(createdUser);

    return createdUser;
  }
}
