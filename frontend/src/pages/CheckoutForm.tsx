import {CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from 'react';


const CheckoutForm = ({clientSecret}: {clientSecret :string}) => {
  const [loading, setLoading] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  
  const handlePaymentSubmit = async(e: React.FormEvent)  => {
    e.preventDefault();
    setLoading(true);
    console.log('clientSecret prop:', clientSecret);

    const cardElement = elements?.getElement(CardElement);

    if(!stripe || !cardElement) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if(result.paymentIntent?.status === "succeeded") {
      alert("Payment Successful");
    }else{
      alert("Payment Failed")
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <CardElement />
      <button disabled={loading}>
        {loading ? "Processing...": "Pay Now"}
      </button>
    </form>
  )
}

export default CheckoutForm;