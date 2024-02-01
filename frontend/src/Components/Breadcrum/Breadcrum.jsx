import React from 'react';
import arrow_icon from "../Assets/arrow.png";
import "./Breadcrum.css";

const Breadcrum = (props) => {
  const { product } = props;

  return (
    <div className='breadcrum'>
      Home <img src={arrow_icon} alt="" />
      SHOP <img src={arrow_icon} alt="" />
      {product && (
        <>
          {product.category && <>{product.category} <img src={arrow_icon} alt="" /></>}
          {product.name && <>{product.name}</>}
        </>
      )}
    </div>
  );
}

export default Breadcrum;
