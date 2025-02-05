import React from "react";
import { Routes, Route } from "react-router-dom";

// Importing Pages
import Home from "../Home/Home";
import Login from "../auth/Login";
import ResetPassword from "../auth/ResetPassword";
import EmailVerify from "../auth/EmailVerify";

// Components
import OurStory from "../components/OurStory";

// Investor Relations
import InvestorRelations from "../pages/Investors/InvestorRelations";
import FinancialReports from "../pages/Investors/FinancialReports";
import PressReleases from "../pages/Investors/PressReleases";
import StockholderInfo from "../pages/Investors/StockholderInfo";
import InvestorFAQs from "../pages/Investors/InvestorFAQs";

// Sustainability
import EnvironmentalImpact from "../pages/Sustainability/EnvironmentalImpact";
import WaterConservation from "../pages/Sustainability/WaterConservation";
import CommunitySupport from "../pages/Sustainability/CommunitySupport";
import SustainabilityReports from "../pages/Sustainability/SustainabilityReports";
import Certifications from "../pages/Sustainability/Certifications";

// Join Us
import Careers from "../pages/JoinUs/Careers";
import InternshipOpportunities from "../pages/JoinUs/InternshipOpportunities";
import LifeAtToomore from "../pages/JoinUs/LifeAtToomore";
import JobOpenings from "../pages/JoinUs/JobOpenings";

// Support
import ContactUs from "../pages/Support/ContactUs";
import Feedback from "../pages/Support/Feedback";
import FAQs from "../pages/Support/FAQs";
import DistributorSupport from "../pages/Support/DistributorSupport";
import CustomerCare from "../pages/Support/CustomerCare";

// Products
import Juices from "../pages/Products/Juices";
import SoftDrinks from "../pages/Products/SoftDrinks";
import EnergyDrinks from "../pages/Products/EnergyDrinks";
import DrinkingWater from "../pages/Products/DrinkingWater";

// Cart
import Cart from "../cart/Cart";
import ShoppingCartPage from "../cart/ShoppingCartPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/email-verify" element={<EmailVerify />} />
      <Route path="/our-story" element={<OurStory />} />

      {/* Cart */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/shoppingcart" element={<ShoppingCartPage />} />

      {/* Products */}
      <Route path="/juices" element={<Juices />} />
      <Route path="/soft-drinks" element={<SoftDrinks />} />
      <Route path="/energy-drinks" element={<EnergyDrinks />} />
      <Route path="/drinking-water" element={<DrinkingWater />} />

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
  );
};

export default AppRoutes;