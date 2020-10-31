import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const { id } = await createUser.execute({ name, email, password });

    return res.json({ name, email, id });
  }
}

export default new UserController();
