import React from 'react';
import ReactDom from 'react-dom';
import { Button } from 'antd';

const posts = <%=posts%>;

console.log(posts);

const Index = () => {
  return <div>
    <h1>index page</h1>
    <Button>首页</Button>
    <ul>
      {
        posts.map(({path, meta, desc})=> (
          <li key={path}>
            <a href={path}>
            <p>{meta.title}</p>
            <p>{desc}</p>
            </a>
          </li>
        ))
      }
    </ul>
  </div>;
};

const container = document.querySelector('#app');

ReactDom.render(<Index />, container);
