import { db } from './../src/dataBase/db';
import fs from 'node:fs';
import Papa from 'papaparse';
import {  service as serviceSchema, staff as staffSchema, client as clientSchema, appointment as appointmentSchema } from '../src/dataBase/schema';
import { eq } from 'drizzle-orm';



type Appointment = {
  'anonymous_name': string,
  'appointment_date': Date,
  'status': string,
  'service_key': string, 
  'Staff Name': string
}


const file = fs.readFileSync('data/cleaned_appointments.csv', 'utf-8');

const parsed = Papa.parse<Appointment>(file, {
  header: true,
  skipEmptyLines: true,
});

const { data } = parsed;

console.log('Total rows:', data.length);
console.log('First row:', data[0]);


async function seed() {
  const services = await db.select().from(serviceSchema);
  const serviceMap: Record<string, string> = {};
  for(const s of services) {
    if(s.service_key) serviceMap[s.service_key] = s.id;
  }

  const staffRows = await db.select().from(staffSchema);
  const staffId = staffRows[0].id;

  for(const row of data) {
    let clientId : string;
    const existingClient  = await db.select()
      .from(clientSchema)
      .where(eq(clientSchema.first_name, row.anonymous_name));
    
    if(existingClient.length === 0){
      const newClient = await db.insert(clientSchema)
        .values({ first_name: row.anonymous_name })
        .returning();
      clientId = newClient[0].id;
    } else{
      clientId = existingClient[0].id;
      
    }
    const serviceId = serviceMap[row.service_key];
    await db.insert(appointmentSchema).values({
      client_id: clientId,
      service_id: serviceId,
      staff_id: staffId,
      appointment_date: new Date(row.appointment_date),
      status: row.status
    });
    
  }
}

seed().catch(console.error);
