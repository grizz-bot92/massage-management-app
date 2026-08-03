import express, { Request, Response, Router } from 'express';
import { db } from '../dataBase/db';
import { appointment, client, service, staff } from '../dataBase/schema';
import { eq, sum, sql, or } from 'drizzle-orm';

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

analyticsRouter.get('/revenue_lost', async(req:Request, res:Response) => {
  const result = await db
    .select({ revenue_lost: sum(service.price) })
    .from(appointment)
    .innerJoin(service, eq(appointment.service_id, service.id))
    .where(or
      (eq(appointment.status, 'no show'), 
      eq(appointment.status, 'cancelled')));
  
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

analyticsRouter.get('/top_visits', async(req:Request, res:Response) => {
  const result = await db.execute(sql`
    select c.first_name as name, count(a.status) as count_status
    from client c
    left join appointment a on c.id = a.client_id
    where a.status = 'completed'
    group by c.first_name
    order by count(a.id) desc limit 10
  `);

  res.json(result.rows);
});

analyticsRouter.get('/top_cancelled_client', async(req:Request, res:Response) =>{
  const result = await db.execute(sql`
    select c.first_name as name, count(a.status) as count_status
    from client c
    left join appointment a on c.id = a.client_id 
    where (a.status = 'cancelled' or a.status = 'no_show')
    group by c.first_name
    order by count(a.id) desc limit 10 
  `);

  res.json(result.rows)
});

analyticsRouter.get('/retention_rate', async(req:Request, res:Response) => {
  const result = await db.execute(sql`
    select count(distinct client_id) as total_clients,
    count(distinct case when appointment_count > 1 then client_id end) as returned_clients,
    round(count(distinct case when appointment_count > 1 then client_id end) * 100.0 / count(distinct client_id), 2) as retention_rate
    from(
      select client_id, 
        count(*) as appointment_count
      from appointment
      where status = 'completed'
      group by client_id
    ) as client_counts  
  `);
  res.json(result.rows);
});



export default analyticsRouter;
