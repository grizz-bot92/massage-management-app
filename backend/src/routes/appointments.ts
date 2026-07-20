import express, { Request, Response, Router } from 'express';
import {db} from '../dataBase/db';
import { eq } from 'drizzle-orm';
import { appointment as appointmentSchema } from '../dataBase/schema';

const appointmentRouter: Router = express.Router();

appointmentRouter.get('/', async (req:Request, res:Response) => {
  const appointments = await db.select().from(appointmentSchema);
  res.json(appointments);
});

appointmentRouter.get('/:id', async (req:Request, res:Response) => {
  const { id } = req.params;
  const appointment  = await db.select().from(appointmentSchema).where(eq(appointmentSchema.id, id))
  res.json(appointment);
});

appointmentRouter.post('/', async (req:Request, res:Response) => {
  const { client_id, service_id, staff_id, appointment_date, status } = req.body;
  const appointment = await db.insert(appointmentSchema).values([{ client_id, service_id, staff_id, appointment_date, status }]).returning();
  res.json(appointment);
});

appointmentRouter.put('/:id', async(req:Request, res:Response) => {
  const { id } = req.params;
  const { client_id, service_id, staff_id, appointment_date, status } = req.body;
  const appointment = await db.update(appointmentSchema).set({ client_id, service_id, staff_id, appointment_date, status }).where(eq(appointmentSchema.id, id)).returning();
  res.json(appointment);
});

appointmentRouter.delete('/:id', async (req:Request, res:Response) => {
  const { id } = req.params;
  const appointment = await db.delete(appointmentSchema).where(eq(appointmentSchema.id, id)).returning();
  res.json(appointment);
});

export default appointmentRouter;

