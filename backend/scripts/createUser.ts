import bcrypt from 'bcrypt';
import { db } from '../../backend/src/dataBase/db';
import { users } from '../../backend/src/dataBase/schema';


async function createUser(username: string, password: string, role: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.insert(users).values({ username, password: hashedPassword, role}).returning();
  process.exit(0);
}

createUser('Brandon', 'password5192', 'admin' ).catch(console.error);