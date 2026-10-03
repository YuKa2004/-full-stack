import { pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull().default('parent'), // 'admin', 'studio', 'parent'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  stripeSessionId: text('stripe_session_id'),
  status: text('status').notNull().default('pending'), // 'pending', 'paid', 'fulfilled'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
