import React from 'react';

const Layout = props => {
  const { children } = props;
  console.log('children', children);

  return <div>{children}</div>;
};

export default Layout;
