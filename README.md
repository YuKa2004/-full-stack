# PrintFlow SaaS (Showcase)

This is a minimal demonstration of a SaaS platform tailored for photography studios, built to manage parent orders, automate print lab fulfillments, and handle secure payments. 

This repository was created to showcase a production-ready architecture using a modern edge-first stack.

## Tech Stack

*   **Runtime:** Bun
*   **Backend:** Hono (Edge-compatible, perfect for Cloudflare Workers)
*   **Database ORM:** Drizzle ORM
*   **Database:** PostgreSQL
*   **Payments:** Stripe (Checkout Sessions & Webhook Fulfillment)
*   **Frontend:** React + Vite + TypeScript

## Features Demonstrated

1.  **Stripe Payment Flow:** Includes creating checkout sessions (`/api/checkout`) and handling secure webhook events (`/api/webhooks/stripe`) to trigger downstream actions when a user successfully pays.
2.  **Drizzle ORM Integration:** A type-safe database schema definition (`src/schema.ts`) handling relational mapping for Users and their Orders.
3.  **Parent Ordering Flow:** A mock API endpoint (`/api/users/:userId/orders`) demonstrating how parent-specific orders can be fetched efficiently.
4.  **Simulated Print Lab Integration:** Shows where external API webhooks can be triggered after a successful Stripe payment to fulfill a physical photography order.

## How to Run Locally

To get this running on your local machine, you'll need [Bun](https://bun.sh/) and Node.js installed.

### 1. Start the Backend (Hono)
```bash
# Install backend dependencies
bun install

# Start the Hono server on http://localhost:3000
bun run dev
```

### 2. Start the Frontend (React + Vite)
Open a new terminal window:
```bash
cd frontend

# Install frontend dependencies (can use npm or bun)
bun install

# Start the Vite development server (proxies API requests to the backend)
bun run dev
```

Navigate to `http://localhost:5173` (or the port Vite provides) to see the mock storefront and trigger the checkout flow.

## Note on Environment Variables
To fully test the Stripe webhooks and Drizzle database locally, you would need to supply a `.env` file with your own `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `DATABASE_URL`. However, the mock architecture can be reviewed directly in the source code.
