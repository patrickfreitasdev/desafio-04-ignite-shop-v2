import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

interface ProductProps {
  id: string;
  quantity: number;
}

interface CheckoutRequestBody {
  products: Record<string, ProductProps>;
  count: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { products, count }: CheckoutRequestBody = req.body;

  if (count <= 0) {
    return res.status(400).json({ error: 'Empty cart.' });
  }

  if (!products) {
    return res.status(400).json({ error: 'Price not found.' });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const line_items = Object.values(products ?? {}).map(({ id, quantity }) => ({
    price: id,
    quantity: quantity,
  }));

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: line_items,
  });


  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}