import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/logo1.png";

const CheckoutNav = () => {
  const location = useLocation();
  
  const steps = [
    { name: "Cart", path: "/shopping-cart" },
    { name: "Checkout", path: "/checkout" },
    { name: "Confirmation", path: "/confirmation" },
  ];

  // Find current step index
  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);

  return (
    <div className="bg-green-950 text-white p-3 md:p-4 rounded-lg mb-4 md:mb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.name} className="flex items-center">
              {/* Step number in circle */}
              <div
                className={`rounded-full h-6 w-6 md:h-8 md:w-8 flex items-center justify-center mr-1 md:mr-2 ${
                  index <= currentStepIndex
                    ? "bg-orange-500"
                    : "bg-gray-600"
                }`}
              >
                <span className="text-xs md:text-sm">{index + 1}</span>
              </div>
              
              {/* Step name */}
              <span
                className={`text-xs md:text-base ${
                  index === currentStepIndex ? "font-bold" : "text-gray-300"
                }`}
              >
                {step.name}
              </span>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={`h-1 w-4 md:w-8 lg:w-24 mx-1 md:mx-2 ${
                    index < currentStepIndex ? "bg-orange-500" : "bg-gray-600"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutNav; 