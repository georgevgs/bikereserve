import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { bikes } from '@/db/schema'

export const getBikes = createServerFn({
  method: 'GET',
}).handler(async () => {
  const allBikes = await db.select().from(bikes).where(eq(bikes.available, true))
  return allBikes
})
