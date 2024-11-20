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
          <h4>문의</h4>
          <p>Container</p>
        </div>
        <div className="footer-item">
          <h4>목적</h4>
          <p>Container</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;