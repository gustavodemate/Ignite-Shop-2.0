import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";
import { CartEntry } from 'use-shopping-cart/core';


export default async function handler (req: NextApiRequest, res: NextApiResponse) {

    const { cartDetails } = req.body;

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
  }

    if(!cartDetails) {
        return res.status(400).json({ error: 'Cart is undefined' })
    }

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_URL}/`

    const lineItems = Object.values(cartDetails ?? {}).map((item: CartEntry) => ({
        price: item.price_id,
        quantity: item.quantity,
        

      }))

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items: lineItems,
        
    })


    return res.status(201).json({
      checkoutUrl: checkoutSession.url,
    })
}