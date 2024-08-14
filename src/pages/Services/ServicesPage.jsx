import React from "react";
import "./ServicesPage.css";
import SandDredging from "./SandDredging";
import Quarry from "./Quarry";
import RealEstate from "./RealEstate";
import CallToActionSection from "../../components/Others/CallToActionSection";

const ServicesPage = () => {
  return (
    <div>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Group Companies</h1>
        </div>
      </div>
      <SandDredging />
      <div className="mt-20"></div>

      <Quarry />
      <div className="mt-20"></div>

      <RealEstate />
      <div className="mt-20"></div>

      <div className="call-to-action-section">
        <CallToActionSection />
      </div>
    </div>
  );
};

export default ServicesPage;
