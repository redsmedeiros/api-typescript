import { AppError } from './../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest{
  id: string;
}

export default class DeleteUserService{

  public async execute({ id }: IRequest): Promise<void>{

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(id);

    if(!user){
      throw new AppError('Usuário não encontrado');
    }

    await userRepository.remove(user);


  }
}
