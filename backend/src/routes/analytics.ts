
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
  order by revenue desc
  limit 5
  `);

  res.json(result.rows);
});

analyticsRouter.get('/revenue_lost', async(req:Request, res:Response) => {
  const result = await db
    .select({ revenue_lost: sum(service.price) })
    .from(appointment)
    .innerJoin(service, eq(appointment.service_id, service.id))
    .where(or
      (eq(appointment.status, 'no_show'), 
      eq(appointment.status, 'cancelled')));
  
  res.json({revenue_lost: result[0].revenue_lost});
});

analyticsRouter.get('/no_show_rate', async(req:Request, res:Response) => {
  const result = await db.execute(sql`
    select 
      round(count(case when status = 'no_show' then 1 end) * 100 / count(*), 2) as no_show_rate,
      count(case when status = 'no_show' then 1 end) as no_shows,
      count(*) as total
    from appointment
  `);
  res.json(result.rows);
});

analyticsRouter.get('/top_visits', async(req:Request, res:Response) => {
  const result = await db.execute(sql`
    select c.first_name as name, count(a.status) as count_status
    from client c
    left join appointment a on c.id = a.client_id
    where a.status = 'completed'
    group by c.first_name
    order by count(a.id) desc limit 5
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


analyticsRouter.get('/appointments_today', async(req:Request, res:Response) => {
  const result = await db.execute(sql`
    select 
      c.first_name,
      s.treatment,
      s.duration,
      a.appointment_date,
      a.status
    from appointment a
    join client c on a.client_id = c.id
    join service s on a.service_id = s.id
    where DATE(appointment_date) = CURRENT_DATE 
    order by a.appointment_date asc
  `);

  res.json(result.rows[0]);
});

analyticsRouter.get('/revenue_by_service', async(req:Request, res:Response) => {
  const result  = await db.execute(sql`
    select treatment, duration,  sum(s.price)
    from appointment a
    join service s on a.service_id = s.id
    where a.status = 'completed'
    group by treatment, duration
    order by sum(price) desc
    limit 5
  `);
  
  res.json(result.rows);
});

analyticsRouter.get('/lost_by_service', async(req:Request, res:Response) => {
  const result  = await db.execute(sql`
    select treatment, duration,  sum(s.price)
    from appointment a
    join service s on a.service_id = s.id
    where (a.status = 'cancelled' or a.status = 'no_show') 
    group by treatment, duration
    order by sum(price) desc
    limit 5
  `);
  
  res.json(result.rows);
});

analyticsRouter.get('/active_clients', async(req:Request, res:Response) => {
  const result = await db.execute(sql`
    select count(distinct client_id) as active_clients
    from appointment
    where status = 'completed'
    and appointment_date >= (select max(appointment_date)from appointment) - interval '90 days'
  `);

  res.json(result.rows[0]);
});

analyticsRouter.get('/monthly_appt_count', async(req:Request, res:Response) => {
  const result = await db.execute(sql`
    select 
      s.treatment, 
      s.duration,
      count(*) as bookings,
      sum(s.price) as revenue
    from appointment a 
    join service s on a.service_id = s.id
    where a.status = 'completed'
    and date_trunc('month', a.appointment_date) = date_trunc('month', (SELECT MAX(appointment_date) FROM appointment))
    group by s.treatment, s.duration
    order by bookings desc; 
  `);
  
  res.json(result.rows)
});

analyticsRouter.get('/cancelled_monthly', async(req:Request, res:Response) => {
  const result = await db.execute(sql`
    select 
      round(count(case when status = 'cancelled' then 1 end) * 100 / count(*), 2) as cancelled_percent,
      count(case when status = 'cancelled' then 1 end) as cancellations,
      count(*) as total
    from appointment
    where date_trunc('month', appointment_date) = date_trunc('month', (SELECT MAX(appointment_date) FROM appointment));
  `);
  res.json(result.rows);
});


analyticsRouter.get('/cancellation_percent', async(req:Request, res:Response) => {
  const result = await db.execute(sql`
    select
      round(count(case when status = 'cancelled' then 1 end) * 100/ count(*), 2) as cancelled_percent,
      count(*) as total
    from appointment  
  `);
  res.json(result.rows)
});

analyticsRouter.get('/treatment_count', async(req: Request, res:Response) => {
  const result = await db.execute(sql`
    select treatment, duration,  count(treatment)
    from appointment a
    join service s on a.service_id = s.id
    where a.status = 'completed'
    group by treatment , duration
    order by count(treatment) desc limit 5
  `);
  res.json(result.rows)
});

export default analyticsRouter;
