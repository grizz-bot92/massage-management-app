import express, {Response, Request, Router} from 'express';
import Stripe from "stripe";

const paymentRouter : Router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

paymentRouter.post('/create_payment', async(req: Request, res: Response) => {
  try{
    const { amount } = req.body as {amount: number};
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd"
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });

  }catch(error) {
    res.status(500).send({ message: "Payment creation failed" })
  
  }
});


export default paymentRouter;