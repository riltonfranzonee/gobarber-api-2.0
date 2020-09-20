import { Router } from 'express';
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
    return res.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionRouter;
