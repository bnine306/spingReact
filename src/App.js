import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'; // 필요한 컴포넌트 import
import Header from './components/Header';
import Shop from './components/Shop';
import Footer from './components/Footer'; 
import ProductDetail from './components/ProductDetail'; 
import Users from './components/Users';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Admin from './components/Admin';
import ProductInput from './components/ProductInput'; // 여기서 import
import Mypage from './components/Mypage';

function App() {
  return (
    <div className="App">
      {/* 헤더 컴포넌트 */}
      <Header />

      {/* 라우팅 설정 */}
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/productinput" element={<ProductInput />} /> {/* ProductInput 경로 추가 */}
        <Route path="/mypage" element={<Mypage />} />
      </Routes>

      {/* 푸터 컴포넌트 */}
      <Footer />
    </div>
  );
}

export default App;