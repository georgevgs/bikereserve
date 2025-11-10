import { createFileRoute, Link } from '@tanstack/react-router';
import { Bike, ArrowLeft, Calendar, DollarSign } from 'lucide-react';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { bikes } from '@/db/schema';

import type { Bike as BikeType } from '@/db/schema';

const BikeDetailsPage = () => {
  const { bike } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            <Bike className="w-6 h-6" />
            BikeReserve
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="btn btn-ghost mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to bikes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BikeImageCard bike={bike} />
          <BikeDetailsCard bike={bike} />
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/bikes/$bikeId')({
  component: BikeDetailsPage,
  loader: async ({ params }) => {
    const bikeIdString = params.bikeId;
    console.log('Loader received bike ID:', bikeIdString);

    const bikeId = parseInt(bikeIdString, 10);

    if (isNaN(bikeId)) {
      throw new Error(`Invalid bike ID: received "${bikeIdString}"`);
    }

    const bike = await db.select().from(bikes).where(eq(bikes.id, bikeId)).limit(1);

    if (bike.length === 0) {
      throw new Error('Bike not found');
    }

    return { bike: bike[0] };
  },
});

interface BikeImageCardProps {
  bike: BikeType;
}

const BikeImageCard = ({ bike }: BikeImageCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="h-96 bg-base-200">{renderBikeImage(bike)}</figure>
    </div>
  );
};

interface BikeDetailsCardProps {
  bike: BikeType;
}

const BikeDetailsCard = ({ bike }: BikeDetailsCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-4xl mb-4">{bike.name}</h1>

        <div className="flex gap-2 mb-4">
          <div className="badge badge-primary badge-lg">{bike.type}</div>
          <div className="badge badge-ghost badge-lg">Size: {bike.size}</div>
        </div>

        {renderBikeDescription(bike.description)}

        <div className="divider" />

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
          <button className="btn btn-primary btn-lg btn-block">
            <Calendar className="w-5 h-5" />
            Reserve This Bike
          </button>
        </div>

        <PickupInfoAlert />
      </div>
    </div>
  );
};

const renderBikeImage = (bike: BikeType) => {
  if (bike.imageUrl) {
    return <img src={bike.imageUrl} alt={bike.name} className="w-full h-full object-cover" />;
  }

  return <Bike className="w-32 h-32 text-base-content opacity-30" />;
};

const renderBikeDescription = (description: string | null) => {
  if (!description) {
    return null;
  }

  return <p className="text-base-content opacity-80 mb-6">{description}</p>;
};

const PickupInfoAlert = () => {
  return (
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
        />
      </svg>
      <span>Pick up at our store location. Flexible rental periods available.</span>
    </div>
  );
};
