import express, { Request, Response, Router } from 'express';
import { db } from '../dataBase/db';
import { appointment, client, service, staff } from '../dataBase/schema';
import { eq } from 'drizzle-orm';

const analyticsRouter: Router = express.Router();





export default analyticsRouter;
