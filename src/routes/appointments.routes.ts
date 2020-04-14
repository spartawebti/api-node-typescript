import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();


const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
    const { provider, date } = req.body;

    const parseDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointments.find(appointment =>
        isEqual(parseDate, appointment.date),
        );

        if (findAppointmentInSameDate) {
            return res
                .status(400)
                .json({ message: 'This appointent is already booked' });

        }

    const appointment = new Appointment(provider, parseDate);

    appointments.push(appointment);

    return res.status(200).json(appointment)
})

export default appointmentsRouter;
