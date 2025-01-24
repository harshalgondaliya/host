import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import EmailVerify from './pages/EmailVerify';
import OurStory from './pages/OurStory';
import InvestorRelations from './pages/Investors/InvestorRelations';
import FinancialReports from './pages/Investors/FinancialReports';
import PressReleases from './pages/Investors/PressReleases';
import StockholderInfo from './pages/Investors/StockholderInfo';
import InvestorFAQs from './pages/Investors/InvestorFAQs';
import EnvironmentalImpact from './pages/Sustainability/EnvironmentalImpact';
import WaterConservation from './pages/Sustainability/WaterConservation';
import CommunitySupport from './pages/Sustainability/CommunitySupport';
import SustainabilityReports from './pages/Sustainability/SustainabilityReports';
import Certifications from './pages/Sustainability/Certifications';
import Careers from './pages/JoinUs/Careers';
import InternshipOpportunities from './pages/JoinUs/InternshipOpportunities';
import LifeAtToomore from './pages/JoinUs/LifeAtToomore';
import JobOpenings from './pages/JoinUs/JobOpenings';
import ContactUs from './pages/Support/ContactUs';
import Feedback from './pages/Support/Feedback';
import FAQs from './pages/Support/FAQs';
import DistributorSupport from './pages/Support/DistributorSupport';
import CustomerCare from './pages/Support/CustomerCare';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Juices from './pages/Products/Juices';
import SoftDrinks from './pages/Products/SoftDrinks';
import EnergyDrinks from './pages/Products/EnergyDrinks';
import DrinkingWater from './pages/Products/DrinkingWater';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/our-story" element={<OurStory />} />

        {/* products */}
        <Route path="/Juices" element={<Juices />} />
        <Route path="/soft-drinks" element={<SoftDrinks />} />
        <Route path="/energy-drinks" element={<EnergyDrinks />} />
        <Route path="/drinking-Water" element={<DrinkingWater />} />

        {/* Investor Relations */}
        <Route path="/investor-relations" element={<InvestorRelations />} />
        <Route path="/financial-reports" element={<FinancialReports />} />
        <Route path="/press-releases" element={<PressReleases />} />
        <Route path="/stockholder-info" element={<StockholderInfo />} />
        <Route path="/investor-FAQs" element={<InvestorFAQs />} />

        {/* Sustainability */}
        <Route path="/env-impact" element={<EnvironmentalImpact />} />
        <Route path="/water-conservation" element={<WaterConservation />} />
        <Route path="/community-support" element={<CommunitySupport />} />
        <Route path="/sustainability-reports" element={<SustainabilityReports />} />
        <Route path="/certifications" element={<Certifications />} />

        {/* Join Us */}
        <Route path="/careers" element={<Careers />} />
        <Route path="/internship-opportunities" element={<InternshipOpportunities />} />
        <Route path="/life-at-toomore" element={<LifeAtToomore />} />
        <Route path="/job-openings" element={<JobOpenings />} />

        {/* Support */}
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/distributor-support" element={<DistributorSupport />} />
        <Route path="/customer-care" element={<CustomerCare />} />
      </Routes>
    </div>
  );
};

export default App;
