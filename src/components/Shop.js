/* Shop.js */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Link 컴포넌트를 추가합니다.
import '../cssfile/Shop.css';

function Shop() {
  const [products, setProducts] = useState([]); // 제품 목록 상태 (초기값 배열)
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [sortOrder, setSortOrder] = useState(''); // 가격 정렬 기준

  // 전체 제품 데이터를 가져오는 함수 (카테고리와 정렬 포함)
  const fetchProducts = async (category = '', sortOrder = '') => {
    setIsLoading(true);
    let url = 'http://localhost:8080/api/products';  // 기본 URL
  
    // 카테고리와 가격 정렬이 없을 경우 전체 제품 목록을 가져오는 요청
    if (!category && !sortOrder) {
      url = 'http://localhost:8080/api/products/all';  // 전체 제품을 가져오는 엔드포인트로 변경
    }
  
    // 카테고리 필터링을 위한 쿼리 파라미터 추가
    if (category) {
      url += `?category=${category}`;
    }
  
    // 가격 정렬을 위한 쿼리 파라미터 추가
    if (sortOrder) {
      url += `${category ? '&' : '?'}sortOrder=${sortOrder}`;
    }
  
    try {
      const response = await fetch(url); // 카테고리와 정렬 조건을 함께 요청
      const data = await response.json();
  
      // 응답 데이터가 배열인지 확인하고, 아니면 빈 배열로 설정
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('응답 데이터가 배열이 아닙니다:', data);
        setProducts([]); // 응답 데이터가 배열이 아닌 경우 빈 배열로 설정
      }
    } catch (error) {
      console.error('제품 데이터 로딩 실패:', error);
      setProducts([]); // 오류가 발생한 경우 빈 배열로 설정
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리 선택 시 해당 카테고리와 가격 정렬 조건을 적용하여 제품 목록 가져오기
  useEffect(() => {
    // 초기 로딩 시에도 전체 제품 목록을 불러오기
    fetchProducts(selectedCategory, sortOrder);
  }, [selectedCategory, sortOrder]); // 카테고리나 정렬 조건이 변경될 때마다 호출

  return (
    <div className="shop-content">
      {/* 카테고리 영역 */}
      <div className="category-bar">
        <h2>카테고리</h2>
        <div className="category-links">
          <span onClick={() => { setSelectedCategory(''); setSortOrder(''); }}>전체보기</span>
          <span onClick={() => setSelectedCategory('전자')}>전자</span>
          <span onClick={() => setSelectedCategory('가전')}>가전</span>
          <span onClick={() => setSelectedCategory('음식')}>음식</span>
          <span onClick={() => setSelectedCategory('건강')}>건강</span>
        </div>
      </div>

      {/* 가격 정렬 영역 */}
      <div className="category-bar">
        <h3>가격 정렬</h3>
        <div className="category-links">
          <button onClick={() => setSortOrder('lowToHigh')}>가격 낮은 순</button>
          <button onClick={() => setSortOrder('highToLow')}>가격 높은 순</button> 
        </div>
      </div>

      {/* 제품 목록 */}
      <div className="shop-space">
        {isLoading ? (
          <p>로딩 중. . .</p>
        ) : (
          products && Array.isArray(products) && products.map((product) => (
            <div className="space-item" key={product.productid}>
              <Link to={`/product/${product.productid}`}> {/* 상품 이미지 클릭 시 상세 페이지로 이동 */}
                <img
                  src={product.imageUrl}
                  alt={product.productnum}
                  className="product-image"  // 이미지 클래스 적용
                />
              </Link>
              <h3>{product.price} 원</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Shop;