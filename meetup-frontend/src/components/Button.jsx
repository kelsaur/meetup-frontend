import React from 'react';

export const commonButtonClasses = "font-semibold py-4 px-8 rounded-2xl transition duration-300 w-full text-xl text-center " +
                                   "bg-[#4B88A2] hover:bg-[#3A6B81] text-white";

function Button({ children, ...props }) {
  return (
    <button className={commonButtonClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;
