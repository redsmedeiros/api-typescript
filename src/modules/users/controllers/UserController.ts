import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UserController{

  public async index(req: Request, res: Response): Promise<Response>{

    const userService = new ListUserService();

    const users = await userService.execute();

    return res.json({
      status: 'success',
      message: 'User list fetched successfully',
      data: users
    });
  }

  public async show(req: Request, res: Response): Promise<Response>{

    const { id } = req.params;

    const userService = new ShowUserService();

    const user = await userService.execute({ id });

    return res.json({
      status: 'success',
      message: 'Single user fetched successfully',
      data: user
    })
  }

  public async create(req: Request, res: Response): Promise<Response>{

    const { name, email, password, avatar } = req.body;

    const userService = new CreateUserService();

    const userCreated = await userService.execute({ name, email , password, avatar});

    return res.json({
      status: 'success',
      message: 'User created successfully',
      data: userCreated
    })
  }

  public async update(req: Request, res: Response): Promise<Response>{

    const { name, email, password } = req.body;

    const { id } = req.params;

    const userService = new UpdateUserService();

    const updatedUser = await userService.execute({ name, email, password, id});

    return res.json({
      status: 'success',
      message: 'User updated successfully',
      data: updatedUser
    });
  }

  public async delete(req: Request, res: Response): Promise<Response>{

    const { id } = req.params;

    const userService = new DeleteUserService();

    await userService.execute({ id });

    return res.json({
      status: 'success',
      message: 'User deleted successfully'
    });
  }
}
