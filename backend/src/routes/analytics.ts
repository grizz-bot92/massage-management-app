import { appointment } from './../dataBase/schema';
import express, { Request, Response, Router } from 'express';
import { db } from '../dataBase/db';
import { appointment, client, service, staff } from '../dataBase/schema';
import { eq, sum, count, sql } from 'drizzle-orm';

const analyticsRouter: Router = express.Router();

analyticsRouter.get('/revenue', async(req:Request, res:Response) => {
  const result = await db
    .select({ total_revenue: sum(service.price) })
    .from(appointment)
    .innerJoin(service, eq(appointment.service_id, service.id))
    .where(eq(appointment.status, 'completed'));

  res.json({ total_revenue: result[0].total_revenue })
});

analyticsRouter.get('/revenue_by_month', async(req:Request, res:Response) => {
  const result = await db.execute(sql`
  select
    date_trunc('month', a.appointment_date) as month,
    sum(s.price) as revenue,
    count(*) as appointments
  from appointment a
  join service s on a.service_id = s.id
  where a.status = 'completed'
  group by month
  order by month
  `);

  res.json(result);
});

analyticsRouter.get('/no_show_rate', async(req:Request, res:Response) => {
  const result = await db.execute(sql`
    select 
      round(count(case when status = 'no_show' then 1 end) * 100 / count(*), 2) as no_show_rate,
      count(case when status = 'no_show' then 1 end) as no_shows,
      count(*) as total
    from appointment
  `);
  res.json(result.rows[0]);
});

analyticsRouter.get('/top_visits', (req:Request, res:Response) => {
  
})



export default analyticsRouter;
