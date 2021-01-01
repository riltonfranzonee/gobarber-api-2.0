import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailability from '../controllers/ProviderMonthAvailability';
import ProviderDayAvailability from '../controllers/ProviderDayAvailability';

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);
providersRouter.get('/', ProvidersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  ProviderMonthAvailability.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  ProviderDayAvailability.index,
);

export default providersRouter;
