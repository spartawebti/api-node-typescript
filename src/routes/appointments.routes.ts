import { Router, response } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository =  new AppointmentRepository();

appointmentsRouter.get('/', (req, res) => {
    const appointment = appointmentRepository.all();

    return res.status(200).json(appointment);
})

appointmentsRouter.post('/', (req, res) => {
    try {
        const { provider, date } = req.body;

        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(appointmentRepository);

        const appointment = createAppointment.execute({ date: parseDate, provider });

        return res.status(200).json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
})

export default appointmentsRouter;
