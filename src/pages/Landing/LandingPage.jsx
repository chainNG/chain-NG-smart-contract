import React from 'react';
import Hero from './Hero';
import HeroServices from './HeroServices';
import HeroGallery from './HeroGallery';
import HeroWhatsNew from './HeroWhatsNew';
import HeroTestimonials from './HeroTestimonials';
import CallToActionSection from "../../components/Others/CallToActionSection";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <HeroServices />
      <HeroGallery />
      <HeroWhatsNew />
      <HeroTestimonials />
      <CallToActionSection />
    </div>
  );
};

export default LandingPage;
