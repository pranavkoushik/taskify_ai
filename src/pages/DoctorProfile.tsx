
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Globe, Clock, Calendar, Video, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { getDoctorById } from '../data/doctors';

export default function DoctorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const doctor = getDoctorById(id || '');
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'in-person' | 'video'>('in-person');
  
  // Generate dates for the next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      
      dates.push({
        dateString: date.toISOString().split('T')[0],
        dayName,
        dayNumber,
        month
      });
    }
    
    return dates;
  };
  
  const availableDates = generateDates();
  
  // Generate time slots
  const generateTimeSlots = () => {
    const times = [];
    const start = 9; // 9 AM
    const end = 17; // 5 PM
    
    for (let hour = start; hour <= end; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === end && minute > 0) continue; // Don't go past 5 PM
        
        const hourFormatted = hour % 12 || 12;
        const minuteFormatted = minute === 0 ? '00' : minute;
        const ampm = hour < 12 ? 'AM' : 'PM';
        
        times.push(`${hourFormatted}:${minuteFormatted} ${ampm}`);
      }
    }
    
    return times;
  };
  
  const timeSlots = generateTimeSlots();
  
  if (!doctor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Doctor not found</h2>
          <p className="mt-2 text-gray-600">The doctor you're looking for doesn't exist or has been removed.</p>
          <Link to="/doctors" className="mt-6 inline-block btn btn-primary">
            View All Doctors
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/doctors" className="text-primary hover:underline mb-6 inline-block">
        &larr; Back to Doctors
      </Link>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Doctor profile information */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-start">
                <img 
                  src={doctor.profileImage} 
                  alt={doctor.name} 
                  className="w-24 h-24 rounded-lg object-cover mr-6"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</h1>
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-gray-500 ml-1">({doctor.reviews.length} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {doctor.specializations.map(spec => (
                      <span key={spec} className="bg-primary-50 text-primary text-xs px-2 py-1 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{doctor.location.city}, {doctor.location.state}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-gray-700">{doctor.bio}</p>
              </div>
              
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
                  <div className="flex items-center mb-2">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">+91 9876543210</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-2" />
                    <a href="#" className="text-sm text-primary hover:underline">www.doctorayush.com</a>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Practice Information</h2>
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{doctor.experience} years experience</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">₹{doctor.consultationFees} per consultation</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Education & Training</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {doctor.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Certifications</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {doctor.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Availability</h2>
                <ul className="text-gray-700">
                  {doctor.availability.map((avail, index) => (
                    <li key={index} className="mb-1">
                      <span className="font-medium">{avail.day}:</span> {avail.startTime} - {avail.endTime}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Patient Reviews ({doctor.reviews.length})</h2>
                {doctor.reviews.map((review, index) => (
                  <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                            fill={i < review.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Appointment booking */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden sticky top-6">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
              
              <div className="mb-4">
                <div className="flex mb-2">
                  <button
                    className={`flex-1 py-2 ${selectedType === 'in-person' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setSelectedType('in-person')}
                  >
                    In-Person
                  </button>
                  <button
                    className={`flex-1 py-2 ${selectedType === 'video' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setSelectedType('video')}
                  >
                    <Video className="h-4 w-4 inline mr-1" />
                    Video
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <div className="flex overflow-x-auto pb-2 -mx-6 px-6">
                  <div className="flex space-x-2">
                    {availableDates.map((date) => (
                      <button
                        key={date.dateString}
                        className={`flex flex-col items-center justify-center p-2 rounded-md min-w-[4rem] border ${
                          selectedDate === date.dateString
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                        onClick={() => setSelectedDate(date.dateString)}
                      >
                        <span className="text-xs font-medium">{date.dayName}</span>
                        <span className="text-lg font-bold">{date.dayNumber}</span>
                        <span className="text-xs">{date.month}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedDate && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        className={`py-2 px-3 rounded-md border text-center ${
                          selectedTime === time
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <button
                className={`btn btn-primary w-full ${(!selectedDate || !selectedTime) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!selectedDate || !selectedTime}
              >
                Book Appointment
              </button>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Consultation Fee: ₹{doctor.consultationFees}</p>
                <p className="mt-1">Free cancellation up to 24 hours before appointment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
