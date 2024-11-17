import React from 'react';
import { Link } from 'react-router-dom';
import '../cssfile/Header.css';  // Header 관련 CSS 파일 추가

function Header() {
  return (
    <div className="header">
      {/* 왼쪽 상단 로고 */}
      <div className="logo">
        <p>로고</p>
      </div>

      {/* 중앙 쇼핑몰 이름 */}
      <div className="shop-name">
        <h1>쇼핑몰 이름</h1>
      </div>

      {/* 오른쪽 상단 링크들 */}
      <div className="header-links">
        <Link to="/signup" className="header-link">회원 가입</Link>
        <Link to="/login" className="header-link">로그인</Link>
        <Link to="/users" className="header-link">회원 목록</Link>
      </div>
    </div>
  );
}

export default Header;