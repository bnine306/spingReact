import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Users from './components/Users';
import SignUp from './components/SignUp';  // 회원가입 컴포넌트 추가
import Login from './components/Login';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/users" element={<Users />} />
      <Route path="/signup" element={<SignUp />} /> {/* 회원가입 페이지 라우트 추가 */}
      <Route path="/login" element={<Login/>}/>
    </Routes>
  </Router>,
  document.getElementById('root')
);