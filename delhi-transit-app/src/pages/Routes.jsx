// src/pages/Routes.jsx
import { useEffect } from 'react';
import { useTransitStore } from '../store/useTransitStore';

export default function RoutesPage() {
  const { routes, isLoading, fetchRoutes } = useTransitStore();

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Routes</h1>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading routes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route) => (
            <div key={route._id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: route.color || '#3b82f6' }}
                />
                <h3 className="text-xl font-bold">{route.routeNumber}</h3>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">{route.type}</span>
              </div>
              <p className="text-gray-700 mb-2">{route.name}</p>
              <p className="text-sm text-gray-600">
                {route.origin} → {route.destination}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Stops:</span> {route.stops.length}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Operating:</span> {route.operatingHours.start} - {route.operatingHours.end}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}