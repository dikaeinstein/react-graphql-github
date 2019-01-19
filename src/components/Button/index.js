import React from 'react';

import './index.css'

const Button = ({
  children, className,
  color = 'black', type = 'button',
  ...props,
}) => (
  <button
    className={`${className} Button Button_${color}`}
    type={type}
    {...props}
  >
    {children}
  </button>
);

const ButtonUnObtrusive = ({
  children, className,
  color = 'black', type = 'button',
  ...props,
}) => (
  <button
    className={`${className} Button_unobtrusive`}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export { ButtonUnObtrusive };
export default Button;
