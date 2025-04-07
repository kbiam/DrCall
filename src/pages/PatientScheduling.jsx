import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, CheckCircle, Loader, AlertCircle } from 'lucide-react';

function PatientScheduling() {
  const { doctorId, uniqueId } = useParams();
  const [searchParams] = useSearchParams();
  const duration = searchParams.get('duration') || 30;
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      // Try to get user data from localStorage if available
      const userStr = localStorage.getItem('userData');
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          setUserData(userData);
          // Pre-fill name and email if user data exists
          setFormData(prev => ({
            ...prev,
            name: userData.name || '',
            email: userData.email || ''
          }));
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }
    }
  }, []);

  // Fetch doctor data from the link
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Make sure the API URL matches your backend endpoint exactly
        const response = await fetch(`http://localhost:5000/doctors/${uniqueId}`);
        
        if (!response.ok) {
          throw new Error('Invalid link or doctor not found');
        }
        
        const data = await response.json();
        setDoctor({
          id: data.doctor.id,
          name: data.doctor.name,
          duration: data.duration
        });
        
        // Generate time slots with the correct duration
        generateTimeSlots(parseInt(data.duration) || 30);
      } catch (err) {
        console.error('Error fetching doctor:', err);
        setError('This appointment link is invalid or has expired.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctorData();
  }, [uniqueId]);

  // Generate available time slots for scheduling
  const generateTimeSlots = (slotDuration) => {
    const slots = [];
    const durationInMs = slotDuration * 60 * 1000;
    
    // Create slots for the next 7 days
    for (let day = 0; day < 7; day++) {
      const date = new Date();
      date.setDate(date.getDate() + day);
      
      // Start at 9 AM
      date.setHours(9, 0, 0, 0);
      
      const daySlots = [];
      
      // Create slots from 9 AM to 5 PM
      for (let i = 0; i < 16; i++) {
        const slotTime = new Date(date.getTime() + i * durationInMs);
        
        // End at 5 PM
        if (slotTime.getHours() >= 17) {
          break;
        }
        
        daySlots.push({
          id: `slot-${day}-${i}`,
          date: slotTime.toISOString().split('T')[0],
          time: slotTime.toTimeString().substring(0, 5),
          datetime: slotTime.toISOString(),
          available: Math.random() > 0.3 // Simulate availability (70% available)
        });
      }
      
      if (daySlots.length > 0) {
        slots.push({
          date: daySlots[0].date,
          slots: daySlots
        });
      }
    }
    
    setAvailableSlots(slots);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setFormData({
        ...formData,
        date: slot.date,
        time: slot.time
      });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format time for display
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Make sure the URL matches your backend route exactly
      const response = await fetch('http://localhost:5000/call/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          doctor_id: doctor.id,
          scheduled_at: selectedSlot.datetime,
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to schedule appointment');
      }
      
      setSuccess(true);
    } catch (err) {
      console.error('Error scheduling appointment:', err);
      setError('Failed to schedule appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handle guest booking
  const handleGuestBooking = async (e) => {
    e.preventDefault();
    
    if (!selectedSlot || !formData.name || !formData.email) {
      alert('Please fill all required fields and select a time slot');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Make sure the URL matches your backend route exactly
      const response = await fetch('http://localhost:5000/call/guest-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          doctor_id: doctor.id,
          name: formData.name,
          email: formData.email,
          scheduled_at: selectedSlot.datetime,
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to schedule appointment');
      }
      
      setSuccess(true);
    } catch (err) {
      console.error('Error scheduling appointment:', err);
      setError(`Failed to schedule appointment: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader className="w-8 h-8 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-600">Loading appointment details...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold text-red-500 mb-2">Error</h1>
        <p className="text-gray-600 text-center">{error}</p>
      </div>
    );
  }

  // Render success state
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Appointment Scheduled!</h1>
        <p className="text-gray-600 text-center mb-6">
          Your appointment with Dr. {doctor.name} has been successfully scheduled for {selectedSlot && formatDate(selectedSlot.date)} at {selectedSlot && formatTime(selectedSlot.time)}.
        </p>
        <p className="text-gray-600 text-center mb-8">
          You will receive a confirmation email with all the details.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Render main UI
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-4">
          <h1 className="text-xl font-bold">Schedule an Appointment</h1>
          <p className="text-blue-100">with Dr. {doctor?.name}</p>
        </div>

        <div className="p-6">
          {/* Instructions */}
          <div className="mb-6">
            <p className="text-gray-600">
              Please select an available time slot and provide your information to schedule a {doctor?.duration || duration}-minute appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Time slots selection */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Select Date & Time
              </h2>

              <div className="mb-6 space-y-4">
                {availableSlots.map((day) => (
                  <div key={day.date} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 border-b">
                      <h3 className="font-medium">{formatDate(day.date)}</h3>
                    </div>
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {day.slots.map((slot) => (
                        <button
                          key={slot.id}
                          className={`px-3 py-2 rounded-md text-sm text-center transition-colors ${
                            selectedSlot?.id === slot.id
                              ? 'bg-blue-500 text-white'
                              : slot.available
                              ? 'bg-white border border-gray-300 hover:bg-gray-100'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                          disabled={!slot.available}
                          onClick={() => handleSlotSelect(slot)}
                        >
                          {formatTime(slot.time)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient information form */}
            <div className="md:col-span-1">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Your Information
              </h2>

              <form onSubmit={loggedIn ? handleSubmit : handleGuestBooking} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled={loggedIn && userData?.name}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled={loggedIn && userData?.email}
                  />
                </div>

                {selectedSlot && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm font-medium text-blue-700">Selected Time:</p>
                    <p className="text-sm text-blue-600">
                      {formatDate(selectedSlot.date)} at {formatTime(selectedSlot.time)}
                    </p>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting || !selectedSlot}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-white ${
                      submitting || !selectedSlot
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin mr-2" />
                        Scheduling...
                      </>
                    ) : (
                      <>
                        Schedule Appointment
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </div>

                {!loggedIn && (
                  <div className="pt-2 text-center">
                    <p className="text-sm text-gray-500">
                      Already have an account?{' '}
                      <a href="/login" className="text-blue-500 hover:underline">
                        Log in
                      </a>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientScheduling;