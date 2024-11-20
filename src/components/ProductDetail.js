import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { productId } = useParams(); // URL에서 상품 ID를 받아옵니다.
  const [product, setProduct] = useState(null); // 상품 상태

  useEffect(() => {
    console.log("Received productId:", productId); // 값 확인
    console.log("Type of productId:", typeof productId); // 타입 확인

    // 상품 상세 정보를 가져오는 함수
    const fetchProductDetail = async () => {
      try {
        // productId를 Long으로 변환
        const numericProductId = Number(productId);  // productId를 숫자로 변환

        // 숫자로 변환된 값으로 서버에 요청
        const response = await axios.get(`http://localhost:8080/api/products/${numericProductId}`);
        setProduct(response.data); // 상품 데이터를 상태에 저장
      } catch (error) {
        console.error("상품 정보를 가져오는데 실패했습니다:", error);
      }
    };

    fetchProductDetail(); // 상품 정보 가져오기
  }, [productId]); // 상품 ID가 변경될 때마다 호출

  return (
    <div className="product-detail">
      {product ? (
        <div>
          <h2 style={{ color: 'black' }}>{product.productnum} - {product.category}</h2>
          <p></p>
          <img src={product.imageUrl} alt={product.productnum} className="product-image" /> {/* 이미지 */}
          <p style={{ color: 'black' }}>{product.price} 원</p>
          <p style={{ color: 'black' }}>입고일: {product.arrivaldate}</p>
          <p style={{ color: 'black' }}>카테고리: {product.category}</p>
        </div>
      ) : (
        <p>상품 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default ProductDetail;