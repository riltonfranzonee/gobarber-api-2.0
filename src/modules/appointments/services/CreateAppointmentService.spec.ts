import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create and return a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123321',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const date = new Date(2020, 10, 1, 10);

    await createAppointment.execute({
      date,
      provider_id: '123321',
    });

    expect(
      createAppointment.execute({
        date,
        provider_id: '1233212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
