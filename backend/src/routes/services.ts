import express, {Router, Response, Request} from 'express';
import { db } from '../dataBase/db';
import { eq } from 'drizzle-orm';
import { service as serviceSchema } from '../dataBase/schema';

const serviceRouter: Router = express.Router();


serviceRouter.get('/', async(req:Request, res:Response) => {
  const service  = await db.select().from(serviceSchema);
  res.json(service);
});

serviceRouter.get('/:id', async(req:Request, res:Response) => {
  const { id } = req.params;
  const service = await db.select().from(serviceSchema).where(eq(serviceSchema.id, id));
  res.json(service);
})

serviceRouter.post('/', async(req:Request, res:Response) => {
  const { treatment, price, duration } = req.body;
  const service  = await db.insert(serviceSchema).values([{ treatment, duration, price }]).returning();
  res.json(service);
});

serviceRouter.put('/:id', async(req:Request, res:Response) => {
  const { id } = req.params;
  const { treatment, price, duration } = req.body;
  const service = await db.update(serviceSchema).set({ treatment, price, duration }).where(eq(serviceSchema.id, id)).returning();
  res.json(service);
});

serviceRouter.delete('/:id', async(req:Request, res:Response) => {
  const { id }  = req.params;
  const service = await db.delete(serviceSchema).where(eq(serviceSchema.id, id)).returning();
  res.json(service);
});

export default serviceRouter;

