import { v4 } from 'uuid';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDto from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDto from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    return this.appointments.find(
      a => isEqual(a.date, date) && a.provider_id === provider_id,
    );
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDto): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (a: any) =>
        a.provider_id === provider_id &&
        getMonth(a.date) + 1 === month &&
        getYear(a.date) === year,
    );

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDayFromProviderDto): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (a: any) =>
        a.provider_id === provider_id &&
        getMonth(a.date) + 1 === month &&
        getDate(a.date) === day &&
        getYear(a.date) === year,
    );

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
