import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest{
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService{

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User>{

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(user_id);

    if(!user){
      throw new Error('User not found');
    }

    if(user.avatar){

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExits = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExits){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}
