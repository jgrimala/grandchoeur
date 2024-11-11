/**
 * button.jsx
 * components\common\button\button.jsx
 */
import React from 'react';

const Button = ({ variant, children, ...props }) => {
  let buttonClass = 'button-primary';
  if (variant === 'secondary') buttonClass = 'button-secondary';
  if (variant === 'outlined') buttonClass = 'button-outlined';

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;