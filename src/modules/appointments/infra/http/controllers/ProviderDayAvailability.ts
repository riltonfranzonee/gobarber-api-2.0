import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ListProviderDayAvailabilityController {
  async index(req: Request, res: Response): Promise<Response> {
    const { day, year, month } = req.query;

    const { provider_id } = req.params;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const providers = await listProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      year: Number(year),
      month: Number(month),
    });

    return res.json(providers);
  }
}

export default new ListProviderDayAvailabilityController();
