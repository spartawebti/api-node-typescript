import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
    id: string;
    provider: string;
    date: Date;
}
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

    const appointment = {
        id: uuid(),
        provider,
        date: parseDate,
    };

    appointments.push(appointment);

    return res.status(200).json(appointment)
})

export default appointmentsRouter;
