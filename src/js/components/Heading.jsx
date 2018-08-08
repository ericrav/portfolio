import React from 'react';

const Heading = ({ H='h1', children }) => {
  return (
    <div className='heading'>
      <H className='heading__text'>{children}</H>
    </div>
  );
};

export default Heading;