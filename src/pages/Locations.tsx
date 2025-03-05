
import { useState, useEffect } from 'react';
import { MapPin, Search, Phone, Globe, Clock, Navigation } from 'lucide-react';
import { locations, getNearbyLocations } from '../data/locations';

export default function LocationsPage() {
  const [locationType, setLocationType] = useState<'all' | 'doctor' | 'store'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  
  // Get user location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);
  
  // Filter locations based on type and search query
  useEffect(() => {
    let result = locations;
    
    if (locationType !== 'all') {
      result = result.filter(loc => loc.type === locationType);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(loc => 
        loc.name.toLowerCase().includes(query) || 
        loc.city.toLowerCase().includes(query) || 
        loc.state.toLowerCase().includes(query)
      );
    }
    
    setFilteredLocations(result);
  }, [locationType, searchQuery]);
  
  // Find nearby locations
  const findNearbyLocations = () => {
    if (!userLocation) {
      alert("Please allow location access to find nearby locations.");
      return;
    }
    
    const nearby = getNearbyLocations(userLocation.latitude, userLocation.longitude, 50); // 50km radius
    setFilteredLocations(nearby);
  };
  
  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Find Locations</h1>
      
      {/* Search and filter section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, city, or state"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={locationType}
              onChange={(e) => setLocationType(e.target.value as 'all' | 'doctor' | 'store')}
            >
              <option value="all">All Locations</option>
              <option value="doctor">Clinics</option>
              <option value="store">Stores</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <button
            onClick={findNearbyLocations}
            className="btn btn-outline-primary flex items-center"
            disabled={!userLocation}
          >
            <Navigation className="h-5 w-5 mr-2" />
            Find Nearby Locations
          </button>
        </div>
      </div>
      
      {/* Locations list */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.length > 0 ? (
          filteredLocations.map(location => (
            <div key={location.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className={`text-xs font-medium text-white px-2 py-1 rounded inline-block mb-2 ${
                  location.type === 'doctor' ? 'bg-blue-500' : 'bg-green-500'
                }`}>
                  {location.type === 'doctor' ? 'Clinic' : 'Store'}
                </div>
                <h2 className="text-xl font-semibold mb-2">{location.name}</h2>
                
                <div className="flex items-start mb-3">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <div className="text-gray-700">{location.address}</div>
                    <div className="text-gray-600">{location.city}, {location.state}, {location.country}</div>
                    {userLocation && (
                      <div className="text-sm text-primary font-medium mt-1">
                        {calculateDistance(
                          userLocation.latitude,
                          userLocation.longitude,
                          location.coordinates.latitude,
                          location.coordinates.longitude
                        ).toFixed(1)} km away
                      </div>
                    )}
                  </div>
                </div>
                
                {location.contactNumber && (
                  <div className="flex items-center mb-3">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">{location.contactNumber}</span>
                  </div>
                )}
                
                {location.website && (
                  <div className="flex items-center mb-3">
                    <Globe className="h-5 w-5 text-gray-400 mr-2" />
                    <a href={location.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {location.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                
                {location.openingHours && (
                  <div className="flex items-start mb-3">
                    <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      {location.openingHours.map((hours, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{hours.day}:</span> {hours.hours}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {location.services && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-1">Services:</h3>
                    <div className="flex flex-wrap gap-1">
                      {location.services.map((service, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.latitude},${location.coordinates.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary flex-1 flex items-center justify-center"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </a>
                  <a 
                    href={`tel:${location.contactNumber?.replace(/\s/g, '')}`}
                    className="btn btn-primary flex-1 flex items-center justify-center"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-3 text-center py-12">
            <p className="text-lg text-gray-600">No locations found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setLocationType('all');
              }}
              className="mt-4 btn btn-outline-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
