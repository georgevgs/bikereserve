import { pgTable, serial, text, timestamp, decimal, boolean, date, varchar } from 'drizzle-orm/pg-core'

export const bikes = pgTable('bikes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'mountain', 'road', 'hybrid', 'electric'
  size: text('size').notNull(), // 'S', 'M', 'L', 'XL'
  description: text('description'),
  pricePerDay: decimal('price_per_day', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  available: boolean('available').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

export const reservations = pgTable('reservations', {
  id: serial('id').primaryKey(),
  bikeId: serial('bike_id').notNull().references(() => bikes.id),
  
  // Guest information
  customerName: text('customer_name').notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 20 }).notNull(),
  
  // Reservation details
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  pickupTime: text('pickup_time'), // 'morning', 'afternoon', 'evening'
  
  // Reservation management
  reservationCode: varchar('reservation_code', { length: 10 }).notNull().unique(),
  status: text('status').notNull().default('pending'), // 'pending', 'confirmed', 'completed', 'cancelled'
  
  // Metadata
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
