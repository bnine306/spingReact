// Footer.js
import React from 'react';
import '../cssfile/Footer.css';  // Footer CSS 파일을 불러옵니다.

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-item">
          <h4>사이트 운영 시작일</h4>
          <p>2024년 11월 18일</p>
        </div>
        <div className="footer-item">
          <h4>문의는 여기로</h4>
          <a href="https://sping.megaposvan.co.kr/" target="_blank" rel="noopener noreferrer">
          <p>https://sping.megaposvan.co.kr</p>
          </a>
        </div>
        <div className="footer-item">
          <h4>목적</h4>
          <p>계절 별미에 관심을 가지고, 각 지역에서 나는 특산물에 대한 접근성을 높이기 위해</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;