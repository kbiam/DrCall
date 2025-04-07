import React from 'react';
import { Calendar, Video, Bell, CreditCard, ArrowRight, Star, Link as L, Clock, Wallet, Shield } from 'lucide-react';
import Badge from '../Components/Common/Badge';
import { Link } from 'react-router-dom';
function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="absolute w-full top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 px-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold  bg-clip-text text-black">
              DrCall
            </div>
            <div className="flex items-center gap-8">
              <button className="text-sm text-black hover:text-gray-900 font-semibold">Features</button>
              <button className="text-sm text-black hover:text-gray-900 font-semibold">Pricing</button>

            </div>
            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 shadow-sm">
                <Link to={'/signup'}>Get Started</Link>
                
              </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-40 py-40  relative h-screen">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: `60px 60px`
        }}
      />
        <div className="max-w-full mx-auto text-center  flex ">
          <div className='flex flex-col items-center w-full   '>
          <div className="inline-block mb-3 px-4 py-1 bg-blue-50 rounded-full">
            <span className="text-sm text-black font-medium">Trusted by 10,000+ doctors</span>
          </div>
          <h1 className="text-6xl font-extrabold mb-6  text-black text-center">
            Scheduling for doctors,
            <span className="block">simplified.</span>
          </h1>
          <p className="text-xl text-black/60 mb-8 text-center max-w-4xl">
            Share your unique booking link with patients. Connect through secure video calls, manage appointments, and handle payments—all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to={'/signup'}>
            <button className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:opacity-90 flex items-center gap-2 shadow-sm hover:cursor-pointer">
              Create your link <ArrowRight size={16} />
            </button>
            </Link>
            <button className="bg-white border border-gray-400 px-6 py-3 rounded-lg text-sm hover:bg-gray-50 text-black shadow-sm">
              View demo
            </button>
          </div>
          </div>


        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <Stat number="10,000+" label="Doctors trust us" />
            <Stat number="1M+" label="Appointments booked" />
            <Stat number="99.99%" label="Uptime" />
          </div>
        </div>
      </div> */}
      {/* How it Works Section */}
      <div className="container mx-auto px-40 py-24 flex flex-col items-center gap-4">
        <Badge text={'How it Works?'}/>
        <h1 className="text-5xl font-extrabold text-black text-center">
          Three simple steps
        </h1>
        <p className="text-lg text-black/60 mb-8 text-center max-w-4xl">
          Get started with DrCall in minutes
        </p>
        <div className="grid md:grid-cols-3 gap-4 mx-auto">
          <Feature 
            icon={<L className="text-black" />}
            title="Generate Your Link"
            description="Create your unique booking link and customize your profile in minutes."
          />
          <Feature 
            icon={<Clock className="text-black" />}
            title="Set Availability"
            description="Sync your calendar and set your consultation hours and fees."
          />
          <Feature 
            icon={<CreditCard className="text-black" />}
            title="Start Accepting Bookings"
            description="Patients can book and pay for appointments instantly."
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-40 py-24 flex flex-col items-center gap-4">
        <Badge text={'Features'}/>
        <h1 className="text-5xl font-extrabold text-black text-center">
          Everything you need
        </h1>
        <p className="text-lg text-black/60 mb-8 text-center max-w-4xl">
          Powerful features to streamline your medical practice
        </p>
        <div className="grid md:grid-cols-2 gap-4 mx-auto">
          <Feature 
            icon={<Video className="text-black" />}
            title="HD Video Calls"
            description="Crystal clear video consultations with built-in recording options and chat."
          />
          <Feature 
            icon={<Shield className="text-black" />}
            title="HIPAA Compliant"
            description="Secure, encrypted platform that meets all medical privacy standards."
          />
          <Feature 
            icon={<Wallet className="text-black" />}
            title="Payment Processing"
            description="Accept payments securely with integrated payment processing system."
          />
          <Feature 
            icon={<Bell className="text-black" />}
            title="Smart Notifications"
            description="Automated reminders via SMS and email to reduce no-shows."
          />
        </div>
      </div>

      {/* Social Proof */}
      <div className="container mx-auto px-40 py-24 flex flex-col items-center gap-4">
      <Badge text={'Testimonials'}/>
          <h1 className="text-5xl font-extrabold   text-black text-center">
          Don’t take our word for it</h1>
          <p className="text-lg text-black/60 mb-8 text-center max-w-4xl">
          Our users are our best ambassadors. Discover why we're the top choice for scheduling meetings.</p>
              <div className="grid md:grid-cols-3 gap-6">
              <TestimonialCard 
                quote="The scheduling experience is incredibly smooth. My patients love it."
                author="Dr. Sarah Chen"
                role="Pediatrician"
              />
              <TestimonialCard 
                quote="Video calls work flawlessly. No more third-party apps needed."
                author="Dr. Michael Roberts"
                role="Family Medicine"
              />
              <TestimonialCard 
                quote="The best part is how it integrates everything into one system."
                author="Dr. Jessica Patel"
                role="Dermatologist"
              />
            </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-8  ">
        
        <div className=" flex flex-col gap-4 items-center max-w-full py-24 h-full mx-auto text-center border-2 border-gray-200 shadow bg-white rounded-2xl relative">
        <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: `60px 60px`
        }}
      />
          <h2 className="text-4xl font-bold">Start accepting bookings today</h2>
          <p className="text-xl text-black/60 mb-4">
            Create your booking link in minutes. No credit card required.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:opacity-90 shadow-sm">
            Get started for free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold mb-4 bg-gradient-to-r from-black to-indigo-600 bg-clip-text text-transparent">
                doctorlink
              </div>
              <p className="text-sm text-gray-600">
                Empowering doctors with simple, effective consultation tools.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <div className="space-y-3">
                <FooterLink text="Features" />
                <FooterLink text="Pricing" />
                <FooterLink text="Security" />
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <div className="space-y-3">
                <FooterLink text="Help Center" />
                <FooterLink text="API" />
                <FooterLink text="Privacy" />
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <div className="space-y-3">
                <FooterLink text="About" />
                <FooterLink text="Blog" />
                <FooterLink text="Careers" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const Stat = ({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-black to-indigo-600 bg-clip-text text-transparent">
      {number}
    </div>
    <div className="text-gray-600 text-sm">{label}</div>
  </div>
);

const Feature = ({ icon, title, description }) => (
  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg transition-shadow">
    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, author, role }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
    <div className="flex mb-4">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={16} className="text-yellow-400" fill="currentColor" />
      ))}
    </div>
    <p className="text-gray-600 text-sm mb-4">"{quote}"</p>
    <div className="text-sm">
      <div className="font-medium">{author}</div>
      <div className="text-gray-500">{role}</div>
    </div>
  </div>
);

const FooterLink = ({ text }) => (
  <button className="block text-sm text-gray-600 hover:text-gray-900">
    {text}
  </button>
);

export default LandingPage;