import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

class ProfileController {
  async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return res.json(classToClass(user));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const createUser = container.resolve(UpdateProfileService);

    const user = await createUser.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return res.json(classToClass(user));
  }
}

export default new ProfileController();
