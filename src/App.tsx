import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutDoctor } from './components/AboutDoctor';
import { SpecialtiesServices } from './components/SpecialtiesServices';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { AppointmentBooking } from './components/AppointmentBooking';
import { ContactDirections } from './components/ContactDirections';
import { Footer } from './components/Footer';
import { QuickActionWidget } from './components/QuickActionWidget';
import { AppointmentsManager } from './components/AppointmentsManager';

export default function App() {
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>();
  const [isAppointmentsManagerOpen, setIsAppointmentsManagerOpen] = useState(false);

  const scrollToBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForBooking(serviceName);
    }
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-teal-100 selection:text-teal-900 pb-12 sm:pb-0">
      {/* Sticky Navigation */}
      <Navbar 
        onOpenBooking={() => scrollToBooking()} 
        onOpenAppointmentsManager={() => setIsAppointmentsManagerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenBooking={() => scrollToBooking()} />

        {/* Doctor Profile & Credentials */}
        <AboutDoctor onOpenBooking={() => scrollToBooking()} />

        {/* Specialties & Services Offerings */}
        <SpecialtiesServices onSelectService={(service) => scrollToBooking(service)} />

        {/* Why Choose This Clinic */}
        <WhyChooseUs />

        {/* Photo Gallery with Lightbox */}
        <Gallery />

        {/* Patient Reviews & Ratings */}
        <Reviews />

        {/* Appointment Booking Inquiry Form */}
        <AppointmentBooking 
          initialService={selectedServiceForBooking}
          onResetInitialService={() => setSelectedServiceForBooking(undefined)}
          onOpenAppointmentsManager={() => setIsAppointmentsManagerOpen(true)}
        />

        {/* Contact, Directions & Timings */}
        <ContactDirections />
      </main>

      {/* Footer & Medical Disclaimers */}
      <Footer />

      {/* Responsive Quick Floating Controls */}
      <QuickActionWidget onOpenBooking={() => scrollToBooking()} />

      {/* Supabase Appointments Database Manager Modal */}
      <AppointmentsManager
        isOpen={isAppointmentsManagerOpen}
        onClose={() => setIsAppointmentsManagerOpen(false)}
      />
    </div>
  );
}
