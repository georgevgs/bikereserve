import { Link, createFileRoute } from '@tanstack/react-router';
import { Bike, Clock, MapPin } from 'lucide-react';

import { getBikes } from '@/api/bikes';

import type { Bike as BikeType } from '@/db/schema';

const HomePage = () => {
  const { bikes } = Route.useLoaderData();

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

      <div className="hero min-h-[400px] bg-primary text-primary-content">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-4">Ready to Ride?</h1>
            <p className="text-lg mb-6">
              Choose from our fleet of premium bikes and explore the city your way
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Easy pickup at our store</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Flexible rental periods</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Available Bikes</h2>

        {renderBikesContent(bikes)}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async () => {
    const bikes = await getBikes();
    return { bikes };
  },
});

const renderBikesContent = (bikes: BikeType[]) => {
  if (bikes.length === 0) {
    return <EmptyBikesState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bikes.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
};

const EmptyBikesState = () => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body items-center text-center py-16">
        <Bike className="w-16 h-16 text-base-content opacity-30 mb-4" />
        <p className="text-lg">No bikes available at the moment</p>
      </div>
    </div>
  );
};

interface BikeCardProps {
  bike: BikeType;
}

const BikeCard = ({ bike }: BikeCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <figure className="h-48 bg-base-200">{renderBikeImage(bike)}</figure>

      <div className="card-body">
        <h3 className="card-title">{bike.name}</h3>

        <div className="flex gap-2 my-2">
          <div className="badge badge-primary">{bike.type}</div>
          <div className="badge badge-ghost">Size: {bike.size}</div>
        </div>

        {renderBikeDescription(bike.description)}

        <div className="card-actions justify-between items-center mt-4">
          <div>
            <span className="text-2xl font-bold text-primary">${bike.pricePerDay}</span>
            <span className="text-sm opacity-70">/day</span>
          </div>

          <Link
            to="/bikes/$bikeId"
            params={{ bikeId: String(bike.id) }}
            className="btn btn-primary"
          >
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
};

const renderBikeImage = (bike: BikeType) => {
  if (bike.imageUrl) {
    return <img src={bike.imageUrl} alt={bike.name} className="w-full h-full object-cover" />;
  }

  return <Bike className="w-20 h-20 text-base-content opacity-30" />;
};

const renderBikeDescription = (description: string | null) => {
  if (!description) {
    return null;
  }

  return <p className="text-sm opacity-70 line-clamp-2">{description}</p>;
};
