import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDto from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDto from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDto from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create: (data: ICreateAppointmentDto) => Promise<Appointment>;
  findByDate: (date: Date) => Promise<Appointment | undefined>;
  findAllInMonthFromProvider: (
    data: IFindAllInMonthFromProviderDto,
  ) => Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDto,
  ): Promise<Appointment[]>;
}
