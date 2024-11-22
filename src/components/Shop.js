import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../cssfile/Shop.css';

function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('');

  const fetchProducts = async (category = '', sortOrder = '') => {
    setIsLoading(true);
    let url = 'http://localhost:8080/api/products';

    // 카테고리와 정렬 기준에 따라 URL을 변경
    if (category || sortOrder) {
      url += '?';
      if (category) {
        url += `category=${category}`;
      }
      if (sortOrder) {
        url += `${category ? '&' : ''}sortOrder=${sortOrder}`;
      }
    } else {
      url = '/api/products/all';
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('응답 데이터가 배열이 아닙니다:', data);
        setProducts([]);
      }
    } catch (error) {
      console.error('제품 데이터 로딩 실패:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory, sortOrder);
  }, [selectedCategory, sortOrder]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);  // 가격에 천 단위 구분 기호 추가
  };

  return (
    <div className="shop-content">
      {/* 카테고리 영역 */}
      <div className="category-bar">
        <h2>제철 음식</h2>
        <div className="category-links">
          <span onClick={() => { setSelectedCategory(''); setSortOrder(''); }}>전체보기</span>
          <span onClick={() => setSelectedCategory('봄')}>봄</span>
          <span onClick={() => setSelectedCategory('여름')}>여름</span>
          <span onClick={() => setSelectedCategory('가을')}>가을</span>
          <span onClick={() => setSelectedCategory('겨울')}>겨울</span>
        </div>
      </div>

      {/* 검색 옵션 영역 */}
      <div className="search-options">
        <h3>검색 옵션</h3>
        <div className="category-links">
          <span onClick={() => setSortOrder('lowToHigh')}>가격 낮은 순</span>
          <span onClick={() => setSortOrder('highToLow')}>가격 높은 순</span>
          <span onClick={() => setSortOrder('latest')}>최신 상품</span>
          <span onClick={() => setSortOrder('sale')}>세일 품목</span>
        </div>
      </div>

      {/* 제품 목록 */}
      <div className="shop-space">
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          products && Array.isArray(products) && products.map((product) => (
            <div className="space-item" key={product.productid}>
              <Link to={`/product/${product.productid}`}>
                <img src={product.imageUrl} alt={product.productnum} className="product-image" />
              </Link>
              <p>{product.content}</p>  {/* 제품 설명 표시 */}
              <h3>{formatPrice(product.price)} 원</h3>  {/* 가격에 포맷 적용 */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Shop;