import React from 'react';
import '../cssfile/Shop.css';

function Shop() {
  return (
    <div className="shop-content">
      {/* 카테고리 영역 */}
      <div className="category-bar">
        <h2>카테고리</h2>
        <div className="category-links">
          <span>전자제품</span>
          <span>의류</span>
          <span>가전</span>
          <span>뷰티</span>
        </div>
      </div>

      {/* 제품 목록 */}
      <div className="shop-space">
        <div className="space-item">
          <img src="./images/product_001.jpg" alt="제품 1" className="product-image" />
          <h3>제품 1</h3>
        </div>
        <div className="space-item">
          <img src="./images/product_002.jpg" alt="제품 2" className="product-image" />
          <h3>제품 2</h3>
        </div>
        <div className="space-item">
          <img src="./images/product_003.jpg" alt="제품 3" className="product-image" />
          <h3>제품 3</h3>
        </div>
        <div className="space-item">
          <img src="./images/product_004.jpg" alt="제품 4" className="product-image" />
          <h3>제품 4</h3>
        </div>
        <div className="space-item">
          <img src="./images/product_005.jpg" alt="제품 5" className="product-image" />
          <h3>제품 5</h3>
        </div>
      </div>
    </div>
  );
}

export default Shop;