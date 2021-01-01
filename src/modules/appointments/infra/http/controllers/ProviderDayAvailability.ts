import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ListProviderDayAvailabilityController {
  async index(req: Request, res: Response): Promise<Response> {
    const { day, year, month } = req.body;

    const { provider_id } = req.params;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const providers = await listProviderDayAvailability.execute({
      provider_id,
      day,
      year,
      month,
    });

    return res.json(providers);
  }
}

export default new ListProviderDayAvailabilityController();
