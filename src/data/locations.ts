
export interface Location {
  id: string;
  name: string;
  type: 'doctor' | 'store';
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contactNumber?: string;
  website?: string;
  openingHours?: {
    day: string;
    hours: string;
  }[];
  services?: string[];
}

// Mock data
export const locations: Location[] = [
  {
    id: "loc1",
    name: "Ayur Vaidya Clinic - Delhi",
    type: "doctor",
    address: "123 Ayur Street, Hauz Khas",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    coordinates: {
      latitude: 28.5456,
      longitude: 77.2023
    },
    contactNumber: "+91 9876543210",
    website: "https://ayurvaidya.com/delhi",
    openingHours: [
      { day: "Monday-Friday", hours: "09:00-18:00" },
      { day: "Saturday", hours: "09:00-14:00" },
      { day: "Sunday", hours: "Closed" }
    ],
    services: ["Consultations", "Panchakarma", "Ayurvedic Massage", "Pulse Diagnosis"]
  },
  {
    id: "loc2",
    name: "Ayur Vaidya Store - Delhi",
    type: "store",
    address: "456 Herb Lane, Connaught Place",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    coordinates: {
      latitude: 28.6315,
      longitude: 77.2167
    },
    contactNumber: "+91 9876543211",
    website: "https://ayurvaidya.com/store/delhi",
    openingHours: [
      { day: "Monday-Saturday", hours: "10:00-20:00" },
      { day: "Sunday", hours: "11:00-18:00" }
    ],
    services: ["Ayurvedic Products", "Herbs", "Consultation Booking", "Workshops"]
  },
  {
    id: "loc3",
    name: "Ayur Vaidya Clinic - Mumbai",
    type: "doctor",
    address: "789 Wellness Road, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    coordinates: {
      latitude: 19.0607,
      longitude: 72.8362
    },
    contactNumber: "+91 9876543212",
    website: "https://ayurvaidya.com/mumbai",
    openingHours: [
      { day: "Monday-Friday", hours: "09:00-18:00" },
      { day: "Saturday", hours: "09:00-14:00" },
      { day: "Sunday", hours: "Closed" }
    ],
    services: ["Consultations", "Panchakarma", "Ayurvedic Massage", "Pulse Diagnosis"]
  },
  {
    id: "loc4",
    name: "Ayur Vaidya Store - Mumbai",
    type: "store",
    address: "101 Ayurveda Avenue, Juhu",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    coordinates: {
      latitude: 19.1075,
      longitude: 72.8263
    },
    contactNumber: "+91 9876543213",
    website: "https://ayurvaidya.com/store/mumbai",
    openingHours: [
      { day: "Monday-Saturday", hours: "10:00-20:00" },
      { day: "Sunday", hours: "11:00-18:00" }
    ],
    services: ["Ayurvedic Products", "Herbs", "Consultation Booking", "Workshops"]
  },
  {
    id: "loc5",
    name: "Ayur Vaidya Clinic - Bangalore",
    type: "doctor",
    address: "222 Healing Street, Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    coordinates: {
      latitude: 12.9784,
      longitude: 77.6408
    },
    contactNumber: "+91 9876543214",
    website: "https://ayurvaidya.com/bangalore",
    openingHours: [
      { day: "Monday-Friday", hours: "09:00-18:00" },
      { day: "Saturday", hours: "09:00-14:00" },
      { day: "Sunday", hours: "Closed" }
    ],
    services: ["Consultations", "Panchakarma", "Ayurvedic Massage", "Pulse Diagnosis"]
  }
];

export function getLocationById(id: string): Location | undefined {
  return locations.find(location => location.id === id);
}

export function getLocationsByType(type: 'doctor' | 'store'): Location[] {
  return locations.filter(location => location.type === type);
}

export function getLocationsByCity(city: string): Location[] {
  return locations.filter(location => location.city.toLowerCase() === city.toLowerCase());
}

export function getNearbyLocations(latitude: number, longitude: number, radiusKm: number): Location[] {
  return locations.filter(location => {
    // Calculate distance using Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = toRad(location.coordinates.latitude - latitude);
    const dLon = toRad(location.coordinates.longitude - longitude);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRad(latitude)) * Math.cos(toRad(location.coordinates.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance <= radiusKm;
  });
}

// Helper function to convert degrees to radians
function toRad(degrees: number): number {
  return degrees * Math.PI / 180;
}
