import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const { id } = await createUser.execute({ name, email, password });

    return res.json({ name, email, id });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
