import express, {Router, Response, Request} from 'express';
import { db } from '../dataBase/db';
import { eq } from 'drizzle-orm';
import { staff as staffSchema } from '../dataBase/schema';

const staffRouter: Router = express.Router();

staffRouter.get('/', async(req:Request, res:Response) => {
  const staff = await db.select().from(staffSchema);
  res.json(staff);
});

staffRouter.get('/:id', async(req:Request, res:Response) => {
  const { id } = req.params;
  const staff = await db.select().from(staffSchema).where(eq(staffSchema.id, id));
  res.json(staff);
});

staffRouter.post('/', async(req:Request, res:Response) => {
  const { first_name, last_name } = req.body;
  const staff = await db.insert(staffSchema).values([{ first_name, last_name }]).returning();
  res.json(staff);
});

staffRouter.put('/:id', async(req:Request, res:Response) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;
  const staff = await db.update(staffSchema).set({ first_name, last_name }).where(eq(staffSchema.id, id)).returning();
  res.json(staff);
});

staffRouter.delete('/:id', async(req:Request, res:Response) => {
  const { id } = req.params;
  const staff = await db.delete(staffSchema).where(eq(staffSchema.id, id)).returning();
  res.json(staff);
})


export default staffRouter;