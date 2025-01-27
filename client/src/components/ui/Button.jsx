import React from "react";

export const Button = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-orange-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};