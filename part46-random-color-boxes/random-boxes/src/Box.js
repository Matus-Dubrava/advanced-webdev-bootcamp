import React from 'react';
import './Box.css';

const Box = (props) => {
  return (
    <div
      className='box-item'
      style={{
        background: props.color
      }}>
    </div>
  );
};

export default Box;
