import { Link } from '@tanstack/react-router';
import { Bike } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Bike className="w-6 h-6 text-blue-600" />
          <span className="text-2xl font-bold text-blue-600">BikeReserve</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
