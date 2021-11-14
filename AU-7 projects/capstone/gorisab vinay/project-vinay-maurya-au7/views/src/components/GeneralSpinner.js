import React from "react";
import Loader from "react-loader-spinner";

const GeneralSpinner = () => {
  return (
    <Loader
      type='Puff'
      color='#123'
      height={100}
      width={100}
      className='general-spinner'
    />
  );
};

export default GeneralSpinner;
