import React from 'react';
import ReactDom from 'react-dom';
import {Helmet} from "react-helmet";
import dayjs from 'dayjs';
import Layout from 'Component/layout';
import {
  Typography, 
  Tag,
  <%=injectedComponent%>
} from 'antd';

import 'Style/main.less';

const attributes = <%=attributes%>;
const { title, date, tags, category} = attributes;

const Page = () => {
  return (<Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Helmet>

    <Typography.Title>{title}</Typography.Title>

    <p>
      {
        tags.map(tag => <Tag key={tag}>{tag}</Tag>)
      }

      发布日期：{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}
    </p>

    <%=content%>
  </Layout>);
};

const container = document.querySelector('#app');

ReactDom.render(<Page />, container);
