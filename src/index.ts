import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { stripe } from './stripe';
import { db } from './db';
import { orders, users } from './schema';
import { eq } from 'drizzle-orm';

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => c.text('Studio SaaS API - Online'));

// --- Stripe Payments ---
app.post('/api/checkout', async (c) => {
  const { priceId, customerId } = await c.req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://your-frontend.com/success',
      cancel_url: 'https://your-frontend.com/cancel',
      client_reference_id: customerId,
    });

    return c.json({ url: session.url });
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

// --- Stripe Webhook & Fulfillment ---
app.post('/api/webhooks/stripe', async (c) => {
  const signature = c.req.header('stripe-signature');
  const body = await c.req.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, endpointSecret);
  } catch (err: any) {
    return c.text(`Webhook Error: ${err.message}`, 400);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const customerId = session.client_reference_id;
    
    // 1. Update Database (Drizzle)
    await db.insert(orders).values({
      userId: customerId,
      stripeSessionId: session.id,
      status: 'paid',
    });

    // 2. Trigger Print Lab Integration (Simulated)
    console.log(`Order paid. Sending job to Print Lab for user ${customerId}...`);
    // await fetch('https://api.printlab.example/v1/orders', { ... })
  }

  return c.json({ received: true });
});

// --- Parent Ordering Flow Example ---
app.get('/api/users/:userId/orders', async (c) => {
  const userId = c.req.param('userId');
  
  // Fetch orders using Drizzle
  const userOrders = await db.select().from(orders).where(eq(orders.userId, userId));
  
  return c.json({ orders: userOrders });
});

export default {
  port: 3000,
  fetch: app.fetch,
};
