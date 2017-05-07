import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

/** 禁止文本选中 */
// document.onselectstart = function (e) {
//     console.log(e);
//     // e.returnValue = false;
// };

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
