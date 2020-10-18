import React from 'react';
import ReactDom from 'react-dom';
import Layout from 'Component/layout';
import <%=injectedComponent%> from 'antd';

import 'Style/main.less';

const Page = () => {
  return (<Layout>
    <%=content%>
  </Layout>);
};

const container = document.querySelector('#app');

ReactDom.render(<Page />, container);
