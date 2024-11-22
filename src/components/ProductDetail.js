import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../cssfile/ProductDetail.css'; // CSS 파일 import

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const numericProductId = Number(productId);
        const response = await axios.get(`/api/products/${numericProductId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("상품 정보를 가져오는데 실패했습니다:", error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value)); // 최소값 1
    setQuantity(value);
  };

  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId'); // 로컬 스토리지에서 사용자 ID 가져오기

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.post('/api/cart/add', {
        userid: userId,
        productid: product.productid,
        quantity: quantity
      });

      if (response.status === 200) {
        alert(`${quantity}개의 ${product.productnum}가 장바구니에 추가되었습니다.`);
      }
    } catch (error) {
      console.error("장바구니 추가에 실패했습니다:", error);
      alert("장바구니 추가에 실패했습니다.");
    }
  };

  return (
    <div className="product-detail">
      {product ? (
        <div className="product-container-horizontal">
          {/* 상품 이미지 */}
          <div className="product-image-container-horizontal">
            <img src={product.imageUrl} alt={product.productnum} className="product-image-large" />
          </div>

          {/* 상품 정보 영역 */}
          <div className="product-info-container-horizontal">
            {/* 카테고리 */}
            <div className="product-category">
              <h3>{product.category}</h3>
            </div>

            <h2 className="product-title">{product.productnum}</h2>
            <p className="product-price">{formatPrice(product.price)} 원</p>

            {/* 상품 상세 정보 */}
            <div className="product-detail-section">
              <p className="product-date">입고일: {product.arrivaldate}</p>
            </div>
            <div className="product-detail-section">
              <p className="product-content">{product.content}</p>
            </div>

            {/* 수량 선택 */}
            <div className="quantity-container-simple">
              <span>수량: </span>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
            </div>

            {/* 장바구니 담기 */}
            <span className="add-to-cart-link" onClick={handleAddToCart}>
              장바구니 담기
            </span>
          </div>
        </div>
      ) : (
        <p>상품 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default ProductDetail;
