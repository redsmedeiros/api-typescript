import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";

export default class SessionController{

  public async create(req: Request, res: Response): Promise<Response>{

    const { email, password } = req.body;

    const sessionService = new CreateSessionService();

    const user = await sessionService.execute({ email, password});

    return res.json({
      status: 'success',
      message: 'Usuário logado com sucesso',
      data: user
    });

  }

}
