import React from 'react';
import './App.css';
import Header from './components/Header';
import Shop from './components/Shop';
import Footer from './components/Footer';  // Footer 컴포넌트 추가

function App() {
  return (
    <div className="App">
      {/* 헤더 컴포넌트 */}
      <Header />
      {/* 쇼핑몰 콘텐츠 컴포넌트 */}
      <Shop />
      {/* 푸터 컴포넌트 */}
      <Footer />
    </div>
  );
}

export default App;