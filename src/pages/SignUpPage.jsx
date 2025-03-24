import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import {jwtDecode} from "jwt-decode";

function SignUpPage() {
    const handleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("User Info:", decoded);
    
        // Redirect user to Google OAuth consent screen for calendar access
        const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=438282206464-26elvm4ohrdfp08edht2jag8b91d1ugd.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=token&scope=openid%20email%20profile%20https://www.googleapis.com/auth/calendar.events%20https://www.googleapis.com/auth/calendar.readonly&include_granted_scopes=true`;
    
        window.location.href = authUrl;
      };
  return (
    <div className='h-screen w-full flex items-center justify-center bg-[#1F1F1F]'>
        <div className='flex flex-col gap-2  '>
            <h1 className='text-white font-bold text-3xl'>Create your DrCall account</h1>
            <p className='text-white/50 font-semibold text-base mb-8'>Free for individuals. Team plans for collaborative features.</p>
            <div className='flex flex-col gap-6 w-full items-center'>
                {/* <button className='w-full bg-white font-medium py-2 rounded-lg' >Continue with Google</button> */}
                <GoogleLogin onSuccess={handleSuccess} onError={()=>console.log("failed")}/>
                <p className='text-white/50 font-semibold'>or</p>
                <button className='w-full bg-black font-medium py-2 rounded-lg text-white border border-white/20' >Continue with Email</button>
            </div>
        </div>
    </div>
  )
}

export default SignUpPage