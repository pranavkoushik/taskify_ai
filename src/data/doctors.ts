
export enum Specialization {
  Ayurveda = "Ayurveda",
  Panchakarma = "Panchakarma",
  Rasayana = "Rasayana",
  Kayachikitsa = "Kayachikitsa",
  Shalya = "Shalya",
  Shalakya = "Shalakya",
  Agada = "Agada",
  Bhuta = "Bhuta",
  Kaumarabhritya = "Kaumarabhritya",
  Rasashastra = "Rasashastra"
}

export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Review {
  patientId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Doctor {
  id: string;
  name: string;
  profileImage: string;
  specializations: Specialization[];
  experience: number; // in years
  education: string[];
  certifications: string[];
  availability: Availability[];
  consultationFees: number;
  reviews: Review[];
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    }
  };
  bio: string;
  rating: number; // Average rating
}

// Mock data
export const doctors: Doctor[] = [
  {
    id: "dr1",
    name: "Dr. Ayush Sharma",
    profileImage: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
    specializations: [Specialization.Ayurveda, Specialization.Panchakarma],
    experience: 15,
    education: ["BAMS - Banaras Hindu University", "MD in Ayurveda - Gujarat Ayurved University"],
    certifications: ["Certified Panchakarma Specialist", "Ayurvedic Nutrition Expert"],
    availability: [
      { day: "Monday", startTime: "09:00", endTime: "17:00" },
      { day: "Wednesday", startTime: "09:00", endTime: "17:00" },
      { day: "Friday", startTime: "09:00", endTime: "17:00" }
    ],
    consultationFees: 1500,
    reviews: [
      { patientId: "p1", rating: 5, comment: "Excellent doctor with deep knowledge of Ayurveda", date: "2023-10-15" },
      { patientId: "p2", rating: 4, comment: "Very helpful and knowledgeable", date: "2023-09-22" }
    ],
    location: {
      address: "123 Ayur Street",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      coordinates: {
        latitude: 28.6139,
        longitude: 77.2090
      }
    },
    bio: "Dr. Sharma has been practicing Ayurveda for over 15 years, specializing in chronic disease management through traditional methods.",
    rating: 4.5
  },
  {
    id: "dr2",
    name: "Dr. Meena Patel",
    profileImage: "https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg",
    specializations: [Specialization.Kayachikitsa, Specialization.Rasayana],
    experience: 12,
    education: ["BAMS - University of Mumbai", "PhD in Ayurvedic Sciences - Jamnagar"],
    certifications: ["Ayurvedic Pulse Diagnosis Expert", "Herbal Formulation Specialist"],
    availability: [
      { day: "Tuesday", startTime: "10:00", endTime: "18:00" },
      { day: "Thursday", startTime: "10:00", endTime: "18:00" },
      { day: "Saturday", startTime: "10:00", endTime: "15:00" }
    ],
    consultationFees: 1800,
    reviews: [
      { patientId: "p3", rating: 5, comment: "Dr. Patel's herbal treatments worked wonders for my chronic condition", date: "2023-11-05" },
      { patientId: "p4", rating: 5, comment: "Very detailed in her approach. Highly recommended!", date: "2023-10-18" }
    ],
    location: {
      address: "456 Wellness Avenue",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      coordinates: {
        latitude: 19.0760,
        longitude: 72.8777
      }
    },
    bio: "Dr. Patel combines traditional Ayurvedic principles with modern wellness approaches to provide holistic healthcare solutions.",
    rating: 4.8
  },
  {
    id: "dr3",
    name: "Dr. Rajesh Gupta",
    profileImage: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg",
    specializations: [Specialization.Shalya, Specialization.Agada],
    experience: 20,
    education: ["BAMS - Rajiv Gandhi University", "MS in Ayurvedic Surgery - Jaipur"],
    certifications: ["Panchakarma Therapist", "Ayurvedic Detoxification Expert"],
    availability: [
      { day: "Monday", startTime: "11:00", endTime: "19:00" },
      { day: "Wednesday", startTime: "11:00", endTime: "19:00" },
      { day: "Saturday", startTime: "09:00", endTime: "14:00" }
    ],
    consultationFees: 2000,
    reviews: [
      { patientId: "p5", rating: 4, comment: "Thorough and patient-focused approach", date: "2023-11-12" },
      { patientId: "p6", rating: 3, comment: "Good doctor but long waiting times", date: "2023-10-30" }
    ],
    location: {
      address: "789 Healing Path",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      coordinates: {
        latitude: 12.9716,
        longitude: 77.5946
      }
    },
    bio: "With 20 years of experience, Dr. Gupta specializes in Ayurvedic surgical procedures and toxicology treatments.",
    rating: 4.2
  }
];

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find(doctor => doctor.id === id);
}

export function getDoctorsBySpecialization(specialization: Specialization): Doctor[] {
  return doctors.filter(doctor => doctor.specializations.includes(specialization));
}

export function getDoctorsByCity(city: string): Doctor[] {
  return doctors.filter(doctor => doctor.location.city.toLowerCase() === city.toLowerCase());
}

export function searchDoctors(query: string): Doctor[] {
  const lowerQuery = query.toLowerCase();
  return doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(lowerQuery) || 
    doctor.specializations.some(spec => spec.toLowerCase().includes(lowerQuery)) ||
    doctor.location.city.toLowerCase().includes(lowerQuery)
  );
}
