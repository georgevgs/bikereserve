import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import ws from 'ws';

import * as schema from './src/db/schema';

config();

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function testBikeQuery() {
  console.log('🔍 Testing bike queries...\n');

  const allBikes = await db.select().from(schema.bikes);
  console.log('📊 All bikes in database:', allBikes.length);
  console.log('First 3 bikes:', allBikes.slice(0, 3));

  console.log('\n🎯 Testing parseInt with different values:');
  const testValues = ['1', '2', 'NaN', '', undefined, null];
  
  testValues.forEach((value) => {
    const parsed = parseInt(value as string, 10);
    console.log(`  parseInt("${value}", 10) = ${parsed}, isNaN: ${isNaN(parsed)}`);
  });

  console.log('\n🔍 Testing bike ID 1 query:');
  const bikeId = 1;
  const bike = await db.select().from(schema.bikes).where(eq(schema.bikes.id, bikeId)).limit(1);
  console.log('Bike with ID 1:', bike);

  await pool.end();
  console.log('\n✅ Test complete');
}

testBikeQuery().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
