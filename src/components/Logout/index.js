import React from 'react';

import withAuthMethods from '../Auth/WithAuthMethods';

const Logout = (props) => {
  return (
    <div>
      <svg
        onClick={() => props.signUp()}
        className='logon-btn'
        xmlns='http://www.w3.org/2000/svg'
        xlink='http://www.w3.org/1999/xlink'
        xmlns='http://svgjs.com/svgjs'
        version='1.1'
        width='512'
        height='512'
        x='0'
        y='0'
        viewBox='0 0 24 24'
        space='preserve'
      >
        <g>
          <path
            xmlns='http://www.w3.org/2000/svg'
            d='m16 13c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-2.5c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z'
            fill='#19646a'
            data-original='#000000'
          />
          <path
            xmlns='http://www.w3.org/2000/svg'
            d='m19.25 18.5c-.414 0-.75-.336-.75-.75v-1c0-.689-.561-1.25-1.25-1.25h-2.5c-.689 0-1.25.561-1.25 1.25v1c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1c0-1.517 1.233-2.75 2.75-2.75h2.5c1.517 0 2.75 1.233 2.75 2.75v1c0 .414-.336.75-.75.75z'
            fill='#19646a'
            data-original='#000000'
          />
          <path
            xmlns='http://www.w3.org/2000/svg'
            d='m7.75 16c-.173 0-.346-.059-.488-.181-.314-.27-.351-.743-.081-1.058l1.081-1.261-1.082-1.262c-.27-.314-.233-.788.081-1.058.315-.27.788-.233 1.058.081l1.5 1.75c.241.281.241.695 0 .977l-1.5 1.75c-.148.173-.358.262-.569.262z'
            fill='#19646a'
            data-original='#000000'
          />
          <path
            xmlns='http://www.w3.org/2000/svg'
            d='m9 14.25h-5.25c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h5.25c.414 0 .75.336.75.75s-.336.75-.75.75z'
            fill='#19646a'
            data-original='#000000'
          />
          <path
            xmlns='http://www.w3.org/2000/svg'
            d='m21.25 23h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-16.5c0-1.517 1.233-2.75 2.75-2.75h18.5c1.517 0 2.75 1.233 2.75 2.75v16.5c0 1.517-1.233 2.75-2.75 2.75zm-18.5-20.5c-.689 0-1.25.561-1.25 1.25v16.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-16.5c0-.689-.561-1.25-1.25-1.25z'
            fill='#19646a'
            data-original='#000000'
          />
          <path
            xmlns='http://www.w3.org/2000/svg'
            d='m23.25 6h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z'
            fill='#19646a'
            data-original='#000000'
          />
        </g>
      </svg>
    </div>
  );
};
export default withAuthMethods(Logout);
