import React from 'react';
import ReactDom from 'react-dom';
import Layout from '@components/layout';

const Page = () => {
  return (<Layout>
    <inject content />
  </Layout>);
};

const container = document.querySelector('#app');

ReactDom.render(<Page />, container);
