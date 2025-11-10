import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'
import * as schema from '../schema'
import ws from 'ws'

config()

neonConfig.webSocketConstructor = ws

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool, { schema })

async function seed() {
  console.log('🌱 Seeding database...')

  const sampleBikes = [
    {
      name: 'Mountain Explorer Pro',
      type: 'mountain',
      size: 'M',
      description: 'Perfect for off-road adventures with full suspension and rugged tires.',
      pricePerDay: '45.00',
      imageUrl: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800',
      available: true,
    },
    {
      name: 'City Cruiser Comfort',
      type: 'hybrid',
      size: 'L',
      description: 'Smooth ride for city streets with comfortable seat and upright position.',
      pricePerDay: '30.00',
      imageUrl: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800',
      available: true,
    },
    {
      name: 'Road Racer Elite',
      type: 'road',
      size: 'M',
      description: 'Lightweight carbon frame designed for speed and long-distance rides.',
      pricePerDay: '55.00',
      imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800',
      available: true,
    },
    {
      name: 'Electric Boost 3000',
      type: 'electric',
      size: 'L',
      description: 'Electric-assist bike with 50-mile range, perfect for effortless touring.',
      pricePerDay: '75.00',
      imageUrl: 'https://images.unsplash.com/photo-1559348349-86f1f65817fe?w=800',
      available: true,
    },
    {
      name: 'Mountain Trail Seeker',
      type: 'mountain',
      size: 'S',
      description: 'Agile mountain bike ideal for technical trails and quick maneuvers.',
      pricePerDay: '40.00',
      imageUrl: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800',
      available: true,
    },
    {
      name: 'Urban Commuter',
      type: 'hybrid',
      size: 'M',
      description: 'Reliable daily commuter with rack and fenders included.',
      pricePerDay: '25.00',
      imageUrl: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800',
      available: true,
    },
  ]

  await db.insert(schema.bikes).values(sampleBikes)

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Added ${sampleBikes.length} bikes`)
  
  await pool.end()
}

seed()
  .catch((error) => {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  })
