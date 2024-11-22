import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // useNavigate 추가
import '../cssfile/Header.css';  // Header 관련 CSS 파일 추가

function Header() {
  const navigate = useNavigate();  // navigate 함수 사용

  // 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem('userId');  // 로컬 스토리지에서 userId 제거
    alert('로그아웃 되었습니다!');  // 로그아웃 알림
    navigate('/');  // 홈 페이지로 리디렉션
  };

  return (
    <div className="header">
      {/* 왼쪽 상단 로고 */}
      <div className="logo">
        <img src="/images/Logo.png" alt="쇼핑몰 로고" className="logo-img" />
      </div>

      {/* 중앙 쇼핑몰 이름 */}
      <div className="shop-name">
        <h1>Store</h1>
      </div>

      {/* 오른쪽 상단 링크들 */}
      <div className="header-links">
        {/* 홈으로 돌아가기 버튼 */}
        <Link to="/" className="header-link">홈으로 돌아가기</Link>
        <Link to="/signup" className="header-link">회원 가입</Link>
        <Link to="/login" className="header-link">로그인</Link>
        <Link to="/mypage" className="header-link">마이페이지</Link>
        <Link to="/admin" className="header-link">관리자 페이지</Link>
        <Link to="/" onClick={handleLogout} className="header-link" style={{ color: 'red' }}>
          로그아웃
        </Link>
      </div>
    </div>
  );
}

export default Header;