import React from 'react';
import { ChevronRight } from 'lucide-react';

function VideoApp() {
  return (
    <div className='min-h-screen bg-[#101010] w-full flex items-center justify-center'>
      <div className='flex flex-col gap-6 max-w-xl w-full'>
        <div className='space-y-2'>
          <h1 className='text-white font-bold text-2xl'>Connect your video apps</h1>
          <p className='text-white/50 font-semibold'>
            Connect your video apps to use them on your event types.
          </p>
        </div>

        <div className='space-y-2'>
          <div className='text-white/50 text-sm'>Step 3 of 5</div>
          <div className='flex gap-2'>
            <div className='h-1 bg-white rounded-full flex-1'></div>
            <div className='h-1 bg-white rounded-full flex-1'></div>
            <div className='h-1 bg-white rounded-full flex-1'></div>
            <div className='h-1 bg-white/10 rounded-full flex-1'></div>
            <div className='h-1 bg-white/10 rounded-full flex-1'></div>
          </div>
        </div>

        <div className='bg-[#1A1A1A] border border-white/10 rounded-lg overflow-hidden'>
          {/* Google Meet */}
          <div className='flex items-center justify-between p-4 border-b border-white/10'>
            <div className='flex items-center gap-3'>
              <img src="/api/placeholder/24/24" alt="Google Meet" className="rounded" />
              <span className='text-white'>Google Meet</span>
            </div>
            <button className='px-3 py-1 text-sm text-white/50 bg-white/5 rounded'>
              Installed
            </button>
          </div>

          {/* Zoom */}
          <div className='flex items-center justify-between p-4 border-b border-white/10'>
            <div className='flex items-center gap-3'>
              <img src="/api/placeholder/24/24" alt="Zoom" className="rounded" />
              <div className='flex items-center gap-2'>
                <span className='text-white'>Zoom Video</span>
                <span className='text-xs px-2 py-0.5 bg-[#1E4620] text-[#95C497] rounded'>Default</span>
              </div>
            </div>
            <button className='px-3 py-1 text-sm text-white bg-white/10 rounded hover:bg-white/20 transition-colors'>
              Connect
            </button>
          </div>

          {/* Discord */}
          <div className='flex items-center justify-between p-4 border-b border-white/10'>
            <div className='flex items-center gap-3'>
              <img src="/api/placeholder/24/24" alt="Discord" className="rounded" />
              <span className='text-white'>Discord</span>
            </div>
            <button className='px-3 py-1 text-sm text-white bg-white/10 rounded hover:bg-white/20 transition-colors'>
              Connect
            </button>
          </div>

          {/* Microsoft Teams */}
          <div className='flex items-center justify-between p-4 border-b border-white/10'>
            <div className='flex items-center gap-3'>
              <img src="/api/placeholder/24/24" alt="Teams" className="rounded" />
              <div className='flex flex-col'>
                <span className='text-white'>Microsoft 365/Teams</span>
                <span className='text-sm text-white/50'>(Requires work/school account)</span>
              </div>
            </div>
            <button className='px-3 py-1 text-sm text-white bg-white/10 rounded hover:bg-white/20 transition-colors'>
              Connect
            </button>
          </div>

          {/* Jitsi */}
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-3'>
              <img src="/api/placeholder/24/24" alt="Jitsi" className="rounded" />
              <span className='text-white'>Jitsi Video</span>
            </div>
            <button className='px-3 py-1 text-sm text-white bg-white/10 rounded hover:bg-white/20 transition-colors'>
              Connect
            </button>
          </div>
        </div>

        <button 
          className='w-full bg-white text-black font-medium rounded py-2 px-4 hover:bg-gray-100 transition-colors flex items-center justify-center gap-1'
        >
          Next Step
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className='flex justify-center'>
          <button className='text-white/50 hover:text-white transition-colors text-sm'>
            Set up later
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoApp;