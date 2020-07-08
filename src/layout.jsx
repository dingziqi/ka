import React from 'react';
import ReactDom from 'react-dom';
import Helmet from 'react-helmet';
// import { <%= components %> } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

class Page extends React.Component{
  render() {
    return (
      <div>
        <Helmet>
          <title><%= attributes.title || '' %></title>
        </Helmet>
        <%= content %>
      </div>
    );
  }
}

const container = document.querySelector('#app');

ReactDom.render(<Page />, container);
