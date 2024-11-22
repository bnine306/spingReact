import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Link 컴포넌트 import
import '../cssfile/Mypage.css';

function Mypage() {
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [cartItems, setCartItems] = useState([]);
  const [showUserInfo, setShowUserInfo] = useState(false);  // 회원 정보 팝업 상태

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // 사용자 정보 가져오기
      axios.get(`/api/user/${userId}`)
        .then(response => {
          setUser(response.data);
          setUpdatedUser({
            email: response.data.email,
            username: response.data.username,
            password: '',
          });

          // 장바구니 데이터 가져오기
          axios.get(`/api/cart/${userId}`)
            .then(cartResponse => {
              const cartData = cartResponse.data;

              // 각 장바구니 아이템에 대한 상품 정보를 추가
              const fetchCartDetails = cartData.map(item => {
                return axios.get(`/api/products/${item.productid}`)
                  .then(productResponse => {
                    return {
                      ...item,
                      productnum: productResponse.data.productnum, // productnum으로 수정
                      price: productResponse.data.price,
                    };
                  });
              });

              // 모든 상품 정보가 담긴 장바구니 데이터 설정
              Promise.all(fetchCartDetails)
                .then(cartDetails => {
                  setCartItems(cartDetails);
                })
                .catch(error => {
                  console.error("There was an error fetching product data for the cart!", error);
                });
            })
            .catch(error => {
              console.error("There was an error fetching cart data!", error);
            });
        })
        .catch(error => {
          console.error("There was an error fetching user data!", error);
        });
    }
  }, []);

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const userId = localStorage.getItem('userId');
    axios.post(`/api/user/${userId}`, { ...updatedUser, updateAt: new Date() })
      .then(response => {
        setUser(response.data);
        setIsEdit(false);
        alert("회원 정보가 수정되었습니다!");  // 수정 완료 알림
      })
      .catch(error => {
        console.error("There was an error updating user data!", error);
      });
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleDelete = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // 먼저 장바구니 항목 삭제
      axios.delete(`/api/cart/${userId}`)
        .then(() => {
          // 장바구니 항목이 모두 삭제된 후 사용자 삭제
          axios.delete(`/api/user/${userId}`)
            .then(response => {
              alert("사용자 계정이 삭제되었습니다.");
              localStorage.removeItem('userId');
              window.location.href = "/login"; // 로그인 페이지로 이동
            })
            .catch(error => {
              console.error("사용자 삭제에 실패했습니다!", error);
              alert("사용자 삭제에 실패했습니다.");
            });
        })
        .catch(error => {
          console.error("장바구니 항목 삭제에 실패했습니다!", error);
          alert("장바구니 항목 삭제에 실패했습니다.");
        });
    }
  };

  // 장바구니에서 상품 삭제
  const handleRemoveItem = (productId) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.delete(`/api/cart/remove/${userId}/${productId}`)
        .then(() => {
          setCartItems(cartItems.filter(item => item.productid !== productId)); // 삭제된 상품 제외
          alert('장바구니에서 상품이 삭제되었습니다.');
        })
        .catch(error => {
          console.error("There was an error deleting the cart item!", error);
          alert('장바구니에서 상품 삭제에 실패했습니다.');
        });
    }
  };

  return (
    <div className="mypage-container">
      {user && (
        <div className="mypage-content">
          <h2>사용자 정보</h2>

          {/* 회원 정보 확인 버튼 */}
          <button className="mypage-info-button" onClick={() => setShowUserInfo(true)}>회원 정보 확인</button>

          {/* 회원 정보 팝업 */}
          {showUserInfo && (
            <div className="mypage-info-popup">
              <div className="popup-content">
                <h3>회원 정보 수정</h3>
                <p>이메일: {isEdit ? <input type="email" name="email" value={updatedUser.email} onChange={handleChange} /> : user.email}</p>
                <p>사용자명: {isEdit ? <input type="text" name="username" value={updatedUser.username} onChange={handleChange} /> : user.username}</p>
                <p>비밀번호: {isEdit ? <input type="password" name="password" value={updatedUser.password} onChange={handleChange} /> : '********'}</p>
                <p>아이디: {user.id}</p>
                <p>권한: {user.role}</p>
                <p>가입일: {user.createAt}</p>
                {!isEdit ? (
                  <button className="mypage-edit-button" onClick={handleEditClick}>수정</button>
                ) : (
                  <div className="mypage-actions">
                    <button className="mypage-save-button" onClick={handleSave}>저장</button>
                    <button className="mypage-cancel-button" onClick={handleCancel}>취소</button>
                  </div>
                )}
                {/* 계정 삭제 버튼 */}
                <button className="mypage-delete-button" onClick={handleDelete}>계정 삭제</button>
                <button className="mypage-close-button" onClick={() => setShowUserInfo(false)}>닫기</button>
              </div>
            </div>
          )}

          {/* 장바구니 */}
          <div>
            <h3>장바구니</h3>
            <ul>
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <li key={item.productid}>
                    {/* 상품 이름을 클릭하면 상세 페이지로 이동 */}
                    <Link to={`/product/${item.productid}`} className="product-link">
                      {item.productnum} - {item.quantity}개 - 가격: {(item.price * item.quantity).toLocaleString()}원
                    </Link>
                    <button className="cart-remove-button" onClick={() => handleRemoveItem(item.productid)}>삭제</button>
                  </li>
                ))
              ) : (
                <p>장바구니에 상품이 없습니다.</p>
              )}
            </ul>
          </div>

          {/* 회원 등급 */}
          <div>
            <h3>회원 등급 :</h3>
            <p>{user.membershipLevel}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mypage;