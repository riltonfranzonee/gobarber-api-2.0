import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

class ListProviderAppointmentsController {
  async index(req: Request, res: Response): Promise<Response> {
    const { day, year, month } = req.body;

    const provider_id = req.user.id;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const providers = await listProviderAppointments.execute({
      provider_id,
      day,
      year,
      month,
    });

    return res.json(providers);
  }
}

export default new ListProviderAppointmentsController();
