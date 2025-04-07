import React from 'react';
import { useForm } from "react-hook-form";
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const onSubmit = (data) => {
    async function signup() {
      try {
        const res = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          })
        });
  
        const json = await res.json();
        console.log(json);
        localStorage.setItem("token",json.token)
        navigate('/doctordashboard')
      } catch (err) {
        console.error("Signup error:", err);
      }
    }
    signup()
  };

  return (
    <div className='min-h-screen bg-[#101010] w-full flex items-center justify-center'>
      <div className='flex flex-col gap-6 max-w-xl w-full'>
        <div className='space-y-2'>
          <h1 className='text-white font-bold text-2xl'>Welcome to DrCall!</h1>

        </div>

        {/* <div className='space-y-2'>
          <div className='text-white/50 text-xs'>Step 1 of 5</div>
          <div className='flex gap-2'>
            <div className='h-1 bg-white rounded-full flex-1'></div>
            <div className='h-1 bg-white/10 rounded-full flex-1'></div>
            <div className='h-1 bg-white/10 rounded-full flex-1'></div>
            <div className='h-1 bg-white/10 rounded-full flex-1'></div>
            <div className='h-1 bg-white/10 rounded-full flex-1'></div>
          </div>
        </div> */}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 mt-8'>
          {/* Username Field
          <div className='space-y-2  flex flex-col'>
            <label className='text-[#E5E7EB] text-base font-medium'>Username</label>
            <div className='flex'>
              <div className='bg-[#1A1A1A] border border-r-0 border-white/10 rounded-l px-3 py-2 text-white/50'>
                drcall.com/
              </div>
              <input 
                type="text" 
                {...register("username", { required: true })}
                className='flex-1 bg-[#1A1A1A] border border-white/10 rounded-r px-3 py-2 text-white outline-none focus:border-white/20 transition-colors'
                placeholder="your-username"
              />
            </div>
          </div> */}


          <div className='space-y-2 flex flex-col'>
            <label className='text-[#E5E7EB] text-base font-medium'>Email</label>
            <input 
              type="email" 
              {...register("email", { required: true })}
              className='w-full bg-[#1A1A1A] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-white/20 transition-colors'
              placeholder="Your email address"
            />
          </div>
          <div className='space-y-2 flex flex-col'>
            <label className='text-[#E5E7EB] text-base font-medium'>Password</label>
            <input 
              type="password" 
              {...register("password", { required: true })}
              className='w-full bg-[#1A1A1A] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-white/20 transition-colors'
              placeholder=""
            />
          </div>

          {/* Timezone Field
          <div className='space-y-2 flex flex-col'>
            <label className='text-[#E5E7EB] text-base font-medium'>Specialization</label>
            <div className='relative'>
              <select 
                {...register("specialization", { required: true })}
                className='w-full bg-[#1A1A1A] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-white/20 transition-colors appearance-none'
              >
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
            </div>
          </div> */}

          {/* Submit Button */}
          <button 
            type="submit"
            className='w-full bg-white text-black font-medium rounded py-2 px-4 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2'
          >
            Login
            <span className='text-lg'>→</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;