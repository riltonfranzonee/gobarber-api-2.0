import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ListProviderMonthAvailabilityController {
  async index(req: Request, res: Response): Promise<Response> {
    const { month, year } = req.body;

    const { provider_id } = req.params;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const providers = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return res.json(providers);
  }
}

export default new ListProviderMonthAvailabilityController();
