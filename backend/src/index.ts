import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import clientRouter from './routes/clients';
import appointmentRouter from './routes/appointments';
import serviceRouter from './routes/services';
import staffRouter from './routes/staff';

dotenv.config();

const PORT = process.env.PORT || 300;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/clients', clientRouter);
app.use('/appointments', appointmentRouter);
app.use('/services', serviceRouter);
app.use('/staff', staffRouter)

const server  = createServer(app);

app.get('/', (req: Request, res:Response) => {
  res.json('massage management app');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})