import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg border shadow-md p-4 bg-white ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="font-bold text-lg mb-2">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className="text-sm text-gray-600">{children}</div>;
};
