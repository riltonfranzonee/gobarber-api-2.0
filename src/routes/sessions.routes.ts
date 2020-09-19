import { Router } from 'express';
import { IsNull } from 'typeorm';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    const { id, name } = user;

    return res.json({ user: { id, name, email }, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionRouter;
