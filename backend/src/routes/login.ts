import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../dataBase/db';
import express, { Request, Response, Router } from 'express';
import { users  } from '../dataBase/users';
import { rateLimit } from 'express-rate-limit';
import { eq } from 'drizzle-orm';


const loginRouter: Router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts, try again later' }
});

loginRouter.post('/', limiter, async(req:Request, res: Response) => {
  const { username , password } = req.body;
  
  const result = await db.select().from(users).where(eq(users.username, username));
  const user = result[0];

  const passwordCorrect = user == null 
    ? false 
    : await bcrypt.compare(password, user.password);

  if(!(user && passwordCorrect)){
    return res.status(401).json({ error: 'invalid username or password' });
  };

  const userForToken = {
    username: user.username,
    id: user.id,
    role: user.role
  };

  const secret = process.env.SECRET;
  if(!secret) {
    return res.status(500).json({ error: 'missing jwt secret' });
  }

  const token = jwt.sign(userForToken, secret as string, { expiresIn: '24h' });

  res.status(200).send({ token, username: user.username });

});

export default loginRouter;