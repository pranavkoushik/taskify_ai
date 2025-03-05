
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Clock, DollarSign } from 'lucide-react';
import { doctors, Specialization } from '../data/doctors';

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  
  // Get unique cities
  const cities = Array.from(new Set(doctors.map(doctor => doctor.location.city)));
  
  // Filter doctors based on search query and filters
  useEffect(() => {
    let result = doctors;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(query) || 
        doctor.specializations.some(spec => spec.toLowerCase().includes(query))
      );
    }
    
    if (selectedSpecialization) {
      result = result.filter(doctor => 
        doctor.specializations.includes(selectedSpecialization as Specialization)
      );
    }
    
    if (selectedCity) {
      result = result.filter(doctor => doctor.location.city === selectedCity);
    }
    
    setFilteredDoctors(result);
  }, [searchQuery, selectedSpecialization, selectedCity]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Find Ayurvedic Doctors</h1>
      
      {/* Search and filter section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or specialization"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
            >
              <option value="">All Specializations</option>
              {Object.values(Specialization).map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Locations</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Doctors list */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={doctor.profileImage} 
                  alt={doctor.name} 
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-gray-500 ml-1">({doctor.reviews.length} reviews)</span>
                </div>
                <div className="mb-2">
                  <div className="text-sm text-gray-600 mb-1">Specializations:</div>
                  <div className="flex flex-wrap gap-1">
                    {doctor.specializations.map(spec => (
                      <span key={spec} className="bg-primary-50 text-primary text-xs px-2 py-1 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-start mb-2">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-600">{doctor.location.city}, {doctor.location.state}</span>
                </div>
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">₹{doctor.consultationFees} per consultation</span>
                </div>
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{doctor.experience} years experience</span>
                </div>
                <Link 
                  to={`/doctors/${doctor.id}`} 
                  className="btn btn-outline-primary w-full"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-3 text-center py-12">
            <p className="text-lg text-gray-600">No doctors found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialization('');
                setSelectedCity('');
              }}
              className="mt-4 btn btn-outline-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
