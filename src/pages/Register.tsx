
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, User, Mail, Phone, Lock, MapPin } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt', formData);
  };
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
              Sign in
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Basic Information</h3>
              <div className="flex items-center border border-gray-300 rounded-md mb-2">
                <div className="px-3 py-2 bg-gray-50">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="name"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border-0 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex items-center border border-gray-300 rounded-md mb-2">
                <div className="px-3 py-2 bg-gray-50">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border-0 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex items-center border border-gray-300 rounded-md">
                <div className="px-3 py-2 bg-gray-50">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border-0 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Address Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Address Details</h3>
              <div className="flex items-center border border-gray-300 rounded-md mb-2">
                <div className="px-3 py-2 bg-gray-50">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="address"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border-0 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <input
                    name="city"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border-0 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex items-center border border-gray-300 rounded-md">
                  <input
                    name="state"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border-0 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            
            {/* Password */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Security</h3>
              <div className="flex items-center border border-gray-300 rounded-md mb-2">
                <div className="px-3 py-2 bg-gray-50">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border-0 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex items-center border border-gray-300 rounded-md">
                <div className="px-3 py-2 bg-gray-50">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border-0 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-primary-dark group-hover:text-primary-light" />
              </span>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
