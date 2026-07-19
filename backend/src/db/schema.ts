import { pgTable, integer, varchar, uuid, decimal, timestamp } from "drizzle-orm/pg-core";

export const client = pgTable('client', {
  id: uuid('id').primaryKey().defaultRandom(),
  first_name: varchar('first_name').notNull(),
  last_name: varchar('last_name'),
  status: varchar('status')
});

export const service = pgTable('service', {
  id: uuid('id').primaryKey().defaultRandom(),
  treatment: varchar('treatment'),
  price: decimal(),
  duration: integer()
});

export const staff = pgTable('staff', { 
  id: uuid('id').primaryKey().defaultRandom(),
  first_name: varchar('first_name').notNull(),
  last_name: varchar('last_name')
});

export const appointment = pgTable('appointment', {
  id: uuid('id').primaryKey().defaultRandom(),
  client_id: uuid('client_id').references(() => client.id),
  service_id: uuid('service_id').references(() => service.id),
  staff_id: uuid('staff_id').references(() => staff.id),
  appointment_date: timestamp('appointment_date'),
  status: varchar('status')
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username').unique().notNull(),
  password: varchar('password').notNull(),
  role: varchar('role').notNull()
});