import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
/**
 * Recebimento das informações
 * Tratativa de erros/excessões
 * Acesso ao repositório
 */

 interface Request {
     provider: string;
     date: Date;
 }

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository;

    constructor(appointmentRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public execute({ date, provider }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointent is already booked');
        }

        const appointment = this.appointmentRepository.create({
            provider,
            date: appointmentDate,
        });
        return appointment;
    }
}

export default CreateAppointmentService;
