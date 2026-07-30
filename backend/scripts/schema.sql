CREATE TABLE client(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  status VARCHAR(255)
);

CREATE TABLE service(
  id SERIAL PRIMARY KEY,
  service_key: varchar(255),
  treatment VARCHAR(255),
  price DECIMAL,
  duration INT
);

CREATE TABLE staff(
  id SERIAL PRIMARY KEY,
  first_name  VARCHAR(255) NOT NULL,
  last_name VARCHAR(255)
);

CREATE TABLE appointment(
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES client(id),
  service_id INTEGER REFERENCES service(id),
  staff_id INTEGER REFERENCES staff(id),
  appointment_date TIMESTAMP,
  status VARCHAR(255)
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL
);

