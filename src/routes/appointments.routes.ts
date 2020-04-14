import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentRepository =  new AppointmentRepository();

appointmentsRouter.get('/', (req, res) => {
    const appointment = appointmentRepository.all();

    return res.status(200).json(appointment);
})

appointmentsRouter.post('/', (req, res) => {
    const { provider, date } = req.body;

    const parseDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentRepository.findByDate(parseDate,);

        if (findAppointmentInSameDate) {
            return res
                .status(400)
                .json({ message: 'This appointent is already booked' });
        }

   const appointment = appointmentRepository.create(provider, parseDate);

    return res.status(200).json(appointment)
})

export default appointmentsRouter;
