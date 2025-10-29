import React from 'react';
import { Link } from 'react-router-dom';

function LinkButton({ to, children }) {
  const buttonClasses = "font-semibold py-4 px-8 rounded-xl transition duration-300 w-full text-xl block text-center " +
                        "bg-[#4B88A2] hover:bg-[#3A6B81] text-white";

  return (
    <Link to={to} className={buttonClasses}>
      {children}
    </Link>
  );
}

export default LinkButton;
