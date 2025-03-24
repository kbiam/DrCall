import React from 'react';
import { useForm } from "react-hook-form";
import { ChevronDown } from 'lucide-react';

function ConnectedCalendar() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className='min-h-screen bg-[#101010] w-full flex items-center justify-center'>
      <div className='flex flex-col gap-6 max-w-xl w-full'>
        <div className='space-y-2'>
          <h1 className='text-white font-bold text-2xl'>Connect your calendar</h1>
          <p className='text-white/50 font-semibold'>
            Connect your calendar to automatically check for busy times and new events as they're scheduled.
          </p>
        </div>

        <div className='space-y-2'>
          <div className='text-white/50 text-sm'>Step 2 of 5</div>
          <div className='flex gap-2'>
            <div className='h-1 bg-white rounded-full flex-1'></div>
            <div className='h-1 bg-white rounded-full flex-1'></div>
            <div className='h-1 bg-white/10 rounded-full flex-1'></div>
            <div className='h-1 bg-white/10 rounded-full flex-1'></div>
            <div className='h-1 bg-white/10 rounded-full flex-1'></div>
          </div>
        </div>

        <div className='space-y-6 mt-8'>
          {/* Google Calendar Section */}
          <div className='bg-[#1A1A1A] border border-white/10 rounded-lg p-4'>
            <div className='flex items-center gap-3 pb-4 border-b border-white/10'>
              <img src="/api/placeholder/24/24" alt="Google Calendar" className="rounded" />
              <div>
                <div className='text-white'>Google Calendar</div>
                <div className='text-white/50 text-sm'>kushbang123@gmail.com</div>
              </div>
            </div>

            <div className='pt-4 space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-white'>kushbang123@gmail.com</span>
                <div className='w-8 h-4 bg-white/10 rounded-full'></div>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-white'>Holidays in India</span>
                <div className='w-8 h-4 bg-white/10 rounded-full'></div>
              </div>
            </div>
          </div>

          {/* Create events section */}
          <div className='space-y-2'>
            <label className='text-white font-medium'>Create events on</label>
            <div className='relative'>
              <select 
                className='w-full bg-[#1A1A1A] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-white/20 transition-colors appearance-none'
              >
                <option>kushbang123@gmail.com (Google - kushbang123@gmail.com)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
            </div>
            <p className='text-white/50 text-sm'>You can override this on a per-event basis in Advanced settings in each event type.</p>
            <p className='text-white/50 text-sm'>You can add more calendars from the app store</p>
          </div>

          {/* Continue Button */}
          <button 
            className='w-full bg-white text-black font-medium rounded py-2 px-4 hover:bg-gray-100 transition-colors'
          >
            Continue
          </button>

          {/* Bottom Links */}
          <div className='flex flex-col items-center gap-2 text-sm'>
            <button className='text-white/50 hover:text-white transition-colors'>
              I'll connect my calendar later
            </button>
            <button className='text-white/50 hover:text-white transition-colors'>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectedCalendar;