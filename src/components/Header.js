import React from 'react';
import { Link } from 'react-router-dom';
import '../cssfile/Header.css';  // Header 관련 CSS 파일 추가

function Header() {
  return (
    <div className="header">
      {/* 왼쪽 상단 로고 */}
      <div className="logo">
        <img src="/images/Logo.png" alt="쇼핑몰 로고" className="logo-img" />
      </div>

      {/* 중앙 쇼핑몰 이름 */}
      <div className="shop-name">
        <h1>Sping</h1>
      </div>

      {/* 오른쪽 상단 링크들 */}
      <div className="header-links">
        <Link to="/signup" className="header-link">회원 가입</Link>
        <Link to="/login" className="header-link">로그인</Link>
        <Link to="/mypage" className="header-link">마이페이지</Link> {/* 마이페이지 링크 추가 */}
        <Link to="/admin" className="header-link admin-link">관리자 페이지</Link>
      </div>
    </div>
  );
}

export default Header;