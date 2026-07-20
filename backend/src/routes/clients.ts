import express, { Request, Response, Router } from 'express';
import { db } from '../dataBase/db';
import { eq } from 'drizzle-orm';
import { client as clientSchema } from '../dataBase/schema';

const clientRouter: Router = express.Router();

clientRouter.get('/', async (req:Request, res:Response) => {
  const clients = await db.select().from(clientSchema);
  res.json(clients)
})

clientRouter.get('/:id', async(req:Request, res:Response) => {
  const { id } = req.params;
  const user = await db.select().from(clientSchema).where(eq(clientSchema.id, id));
  res.json(user);
})

clientRouter.post('/', async (req:Request, res:Response) => {
  const { first_name, last_name, status } = req.body;
  const client = await db.insert(clientSchema).values([{ first_name, last_name, status }]).returning();
  res.json(client);
});

clientRouter.put('/:id', async(req:Request, res:Response) => {
  const { id } = req.params;
  const { first_name, last_name, status } = req.body;
  const client = await db.update(clientSchema).set({ first_name, last_name, status }).where(eq(clientSchema.id, id)).returning();
  res.json(client);
})

clientRouter.delete('/:id', async(req:Request, res:Response) => {
  const { id } = req.params;
  const client  = await db.delete(clientSchema).where(eq(clientSchema.id, id)).returning();
  res.json(client);
})


export default clientRouter;