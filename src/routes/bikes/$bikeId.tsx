import { createFileRoute, Link } from '@tanstack/react-router'
import { Bike, ArrowLeft, Calendar, DollarSign } from 'lucide-react'
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { bikes } from '@/db/schema'
import { eq } from 'drizzle-orm'

const getBikeById = createServerFn({
  method: 'GET',
})
  .inputValidator((bikeId: string) => bikeId)
  .handler(async ({ input }) => {
    const bikeId = parseInt(input)
    const bike = await db.select().from(bikes).where(eq(bikes.id, bikeId)).limit(1)
    
    if (bike.length === 0) {
      throw new Error('Bike not found')
    }
    
    return bike[0]
  })

export const Route = createFileRoute('/bikes/$bikeId')({
  component: BikeDetailsPage,
  loader: async ({ params }) => {
    const bike = await getBikeById({ input: params.bikeId })
    return { bike }
  },
})

function BikeDetailsPage() {
  const { bike } = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            <Bike className="w-6 h-6" />
            BikeReserve
          </Link>
        </div>
      </div>

      {/* Bike Details */}
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="btn btn-ghost mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to bikes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="card bg-base-100 shadow-xl">
            <figure className="h-96 bg-base-200">
              {bike.imageUrl ? (
                <img
                  src={bike.imageUrl}
                  alt={bike.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Bike className="w-32 h-32 text-base-content opacity-30" />
              )}
            </figure>
          </div>

          {/* Details */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h1 className="card-title text-4xl mb-4">{bike.name}</h1>

              <div className="flex gap-2 mb-4">
                <div className="badge badge-primary badge-lg">{bike.type}</div>
                <div className="badge badge-ghost badge-lg">Size: {bike.size}</div>
              </div>

              {bike.description ? (
                <p className="text-base-content opacity-80 mb-6">
                  {bike.description}
                </p>
              ) : null}

              <div className="divider"></div>

              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-4xl font-bold text-primary">
                    ${bike.pricePerDay}
                    <span className="text-xl text-base-content opacity-70">/day</span>
                  </div>
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <Link
                  to="/bikes/$bikeId/reserve"
                  params={{ bikeId: String(bike.id) }}
                  className="btn btn-primary btn-lg btn-block"
                >
                  <Calendar className="w-5 h-5" />
                  Reserve This Bike
                </Link>
              </div>

              <div className="alert alert-info mt-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Pick up at our store location. Flexible rental periods available.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
