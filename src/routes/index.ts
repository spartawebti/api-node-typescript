import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

routes.post('/users', (req, res) => {
    const { name, email } = req.body;

    const user = {
        name,
        email
    }
    return res.status(200).json(user);
});

export default routes;
