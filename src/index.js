import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// React Router에서 BrowserRouter만 import하여 사용
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  // Router를 App 컴포넌트에 감싸줍니다.
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);