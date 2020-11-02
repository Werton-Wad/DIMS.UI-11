import React from 'react';

import './spinner.css';
const Spinner = () => {
  return (
    <svg
      className='spinner'
      xmlns='http://www.w3.org/2000/svg'
      xlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <path
        d='M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843'
        fill='none'
        stroke='#46aca3'
        stroke-width='12'
      ></path>
      <path d='M49 3L49 27L61 15L49 3' fill='#46aca3'></path>
      <animateTransform
        attributeName='transform'
        type='rotate'
        repeatCount='indefinite'
        dur='1s'
        values='0 50 50;360 50 50'
        keyTimes='0;1'
      ></animateTransform>
    </svg>
  );
};
export default Spinner;
