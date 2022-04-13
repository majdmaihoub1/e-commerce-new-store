import React from 'react';
import './custom-button.style.scss';

//to be able to pass the props of a button
//we need to hold the children of our props that get passed into the button
//then destructure the other props
const CustomButton = ({ children, isGoogleSIgnIn, ...otherProps }) => (
  <button
    className={`${isGoogleSIgnIn ? `google-sign-in` : ''} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
