import React from 'react';

function InputField({ className, ...props }) {
  const baseInputClasses = "w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B88A2] text-lg";

  return (
    <input
      className={`${baseInputClasses} ${className || ''}`}
      {...props}
    />
  );
}

export default InputField;
