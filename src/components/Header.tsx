import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">BikeReserve</span>
        </Link>
      </div>
    </header>
  )
}
