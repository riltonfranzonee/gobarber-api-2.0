import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

class ListProviderAppointmentsController {
  async index(req: Request, res: Response): Promise<Response> {
    const { day, year, month } = req.query;

    const provider_id = req.user.id;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      year: Number(year),
      month: Number(month),
    });

    return res.json(classToClass(appointments));
  }
}

export default new ListProviderAppointmentsController();
