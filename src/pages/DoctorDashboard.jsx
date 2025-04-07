import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Copy, Link, Users, Video, CheckCircle, ChevronDown, AlertCircle } from 'lucide-react';

function DoctorDashboard() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [recentLinks, setRecentLinks] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch user data and appointments on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Redirect to login if no token
          window.location.href = '/login';
          return;
        }
        
        // Fetch user profile
        const userResponse = await fetch('http://localhost:5000/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await userResponse.json();
        setUser(userData);
        
        // Fetch appointments
        const appointmentsResponse = await fetch('http://localhost:5000/call/doctor', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!appointmentsResponse.ok) {
          throw new Error('Failed to fetch appointments');
        }
        
        const appointmentsData = await appointmentsResponse.json();
        setAppointments(appointmentsData);
        
        // Fetch recent links
        const linksResponse = await fetch('http://localhost:5000/links/recent', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (linksResponse.ok) {
          const linksData = await linksResponse.json();
          setRecentLinks(linksData);
        }
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Function to generate a new link for patients
  const generateNewLink = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/links/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ duration })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate link');
      }
      
      const data = await response.json();
      return data.link;
    } catch (err) {
      console.error('Error generating link:', err);
      setError('Failed to generate link. Please try again.');
      return null;
    }
  };
  
  // Copy link to clipboard
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Count today's appointments
  const getTodayAppointments = () => {
    if (!appointments.length) return 0;
    
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(app => app.scheduled_at.startsWith(today)).length;
  };
  
  // Generate and copy a new link
  const handleGenerateAndCopyLink = async () => {
    const link = await generateNewLink();
    if (link) {
      copyToClipboard(link);
      
      // Add the new link to recent links
      const now = new Date();
      setRecentLinks([
        { 
          id: Date.now(), // Temporary ID
          link: link,
          created_at: now.toISOString()
        },
        ...recentLinks
      ]);
      
      setTimeout(() => setShowGenerateModal(false), 1500);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center">Loading your dashboard...</div>;
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center">
        <div className="bg-[#1A1A1A] border border-red-500/30 rounded-lg p-6 max-w-md flex items-center gap-3">
          <AlertCircle className="text-red-500" />
          <p>Error: {error}. Please refresh or try again later.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center">Session expired. Please log in again.</div>;
  }

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      {/* Top Navigation */}
      <nav className="bg-[#1A1A1A] border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">DrCall</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#252525] rounded-full w-8 h-8 flex items-center justify-center">
            {user.name.charAt(0)}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold">Welcome, Dr. {user.name}</h2>
            <p className="text-white/50">Manage your appointments and patient links</p>
          </div>
          <button 
            onClick={() => setShowGenerateModal(true)}
            className="mt-4 md:mt-0 bg-white text-black font-medium rounded py-2 px-4 hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <Link size={16} />
            Generate Patient Link
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-white/70" size={20} />
              <h3 className="text-white/70 font-medium">Today's Appointments</h3>
            </div>
            <p className="text-2xl font-bold">{getTodayAppointments()}</p>
          </div>
          <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-white/70" size={20} />
              <h3 className="text-white/70 font-medium">Total Patients</h3>
            </div>
            <p className="text-2xl font-bold">{appointments.reduce((acc, curr) => {
              if (!acc.includes(curr.patient_id)) {
                acc.push(curr.patient_id);
              }
              return acc;
            }, []).length}</p>
          </div>
          <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Video className="text-white/70" size={20} />
              <h3 className="text-white/70 font-medium">Completed Calls</h3>
            </div>
            <p className="text-2xl font-bold">{appointments.filter(app => app.call_status === 'completed').length}</p>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Upcoming Appointments</h3>
          {appointments.length === 0 ? (
            <p className="text-white/50 py-4">No appointments scheduled yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-white/50 border-b border-white/10">
                    <th className="text-left py-3 px-2">Patient</th>
                    <th className="text-left py-3 px-2">Date & Time</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appointment => (
                    <tr key={appointment.id} className="border-b border-white/5">
                      <td className="py-4 px-2">{appointment.patient_name}</td>
                      <td className="py-4 px-2">{formatDate(appointment.scheduled_at)}</td>
                      <td className="py-4 px-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          appointment.call_status === 'completed' ? 'bg-green-900/30 text-green-400' : 
                          appointment.call_status === 'missed' ? 'bg-red-900/30 text-red-400' : 
                          'bg-blue-900/30 text-blue-400'
                        }`}>
                          {appointment.call_status.charAt(0).toUpperCase() + appointment.call_status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <button className="text-white/70 hover:text-white">
                          <Video size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Links Generated */}
        <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Recent Links</h3>
          {recentLinks.length === 0 ? (
            <p className="text-white/50 py-4">No links generated yet. Click "Generate Patient Link" to create your first link.</p>
          ) : (
            <div className="space-y-4">
              {recentLinks.map(link => (
                <div key={link.id} className="p-4 bg-[#252525] rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-sm text-white/70 mb-1">
                      Generated on {new Date(link.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-white break-all">{link.link}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(link.link)}
                    className="flex items-center gap-2 bg-[#1A1A1A] text-white/80 py-2 px-4 rounded hover:bg-[#252525] transition-colors"
                  >
                    <Copy size={16} />
                    Copy Link
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Generate Link Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Generate Patient Link</h3>
            
            <div className="mb-4">
              <label className="text-white/70 block mb-2">Appointment Duration</label>
              <div className="relative">
                <select 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-[#252525] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-white/20 transition-colors appearance-none"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
              </div>
            </div>
            
            <div className="bg-[#252525] border border-white/5 rounded p-3 mb-6">
              <p className="text-sm text-white/70 mb-1">Link Preview</p>
              <p className="text-white break-all text-sm">{`https://drcall.com/meet/${user.id}/${Math.random().toString(36).substring(2, 10)}?duration=${duration}`}</p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowGenerateModal(false)}
                className="flex-1 bg-transparent border border-white/20 text-white py-2 rounded hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleGenerateAndCopyLink}
                className="flex-1 bg-white text-black font-medium rounded py-2 px-4 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                {linkCopied ? (
                  <>
                    <CheckCircle size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;