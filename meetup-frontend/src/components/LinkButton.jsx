import React from 'react';
import { Link } from 'react-router-dom';
import { commonButtonClasses } from './Button';

function LinkButton({ to, children, ...props }) {

  const finalClasses = `${commonButtonClasses} block`;

  return (
    <Link to={to} className={finalClasses} {...props}>
      {children}
    </Link>
  );
}

export default LinkButton;
