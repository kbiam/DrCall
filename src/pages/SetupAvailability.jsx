import React, { useState } from 'react';
import { ChevronRight, Plus, Copy } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
function SetupAvailability() {
  const [availability, setAvailability] = useState({
    Monday: { enabled: true, start: '9:00am', end: '5:00pm' },
    Tuesday: { enabled: true, start: '9:00am', end: '5:00pm' },
    Wednesday: { enabled: true, start: '9:00am', end: '5:00pm' },
    Thursday: { enabled: true, start: '9:00am', end: '5:00pm' },
    Friday: { enabled: true, start: '9:00am', end: '5:00pm' },
    Saturday: { enabled: false, start: '9:00am', end: '5:00pm' },
    Sunday: { enabled: false, start: '9:00am', end: '5:00pm' }
  });

  const toggleDay = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled }
    }));
  };

  return (
    <div className='min-h-screen bg-[#101010] w-full flex items-center justify-center'>
      <div className='flex flex-col gap-6 max-w-xl w-full'>
        <div className='space-y-2'>
          <h1 className='text-white font-bold text-2xl'>Set your availability</h1>
          <div className='space-y-1'>
            <p className='text-white/50 font-semibold'>
              Define ranges of time when you are available
            </p>
            <p className='text-white/50 font-semibold'>
              You can customise all of this later in the availability page.
            </p>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='text-white/50 text-sm'>Step 4 of 5</div>
          <div className='flex gap-2'>
            <div className='h-1 bg-white rounded-full flex-1'></div>
            <div className='h-1 bg-white rounded-full flex-1'></div>
            <div className='h-1 bg-white rounded-full flex-1'></div>
            <div className='h-1 bg-white rounded-full flex-1'></div>
            <div className='h-1 bg-white/10 rounded-full flex-1'></div>
          </div>
        </div>

        <div className='bg-[#1A1A1A] border border-white/10 rounded-lg p-4 space-y-4'>
          {Object.entries(availability).map(([day, { enabled, start, end }]) => (
            <div key={day} className='flex items-center gap-4'>
              <div 
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                  enabled ? 'bg-white' : 'bg-white/10'
                }`}
                onClick={() => toggleDay(day)}
              >
                <div 
                  className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                    enabled ? 'bg-black left-7' : 'bg-white/50 left-1'
                  }`}
                />
              </div>
              
              <span className='text-white w-24'>{day}</span>
              
              {enabled && (
                <>
                  <input 
                    type="text" 
                    value={start}
                    className='bg-[#101010] border border-white/10 rounded px-3 py-1 text-white text-sm w-24'
                    readOnly
                  />
                  <span className='text-white'>-</span>
                  <input 
                    type="text" 
                    value={end}
                    className='bg-[#101010] border border-white/10 rounded px-3 py-1 text-white text-sm w-24'
                    readOnly
                  />
                  <button className='text-white/50 hover:text-white'>
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className='text-white/50 hover:text-white'>
                    <Copy className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <button 
          className='w-full bg-white text-black font-medium rounded py-2 px-4 hover:bg-gray-100 transition-colors flex items-center justify-center gap-1'
        >
          Next Step
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className='flex justify-center'>
          <button className='text-white/50 hover:text-white transition-colors text-sm'>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetupAvailability;