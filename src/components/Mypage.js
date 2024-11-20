import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Mypage() {
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    email: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:8080/api/user/${userId}`)
        .then(response => {
          setUser(response.data);
          setUpdatedUser({
            email: response.data.email,
            username: response.data.username,
            password: '',
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
      [e.target.name]: e.target.value, // 예를 들어, name="email"인 입력 필드에서 값이 변경되면 e.target.name은 "email"이 되고, 그 값은 e.target.value(입력된 값)로 업데이트
    });
  };

  const handleSave = () => {
    const userId = localStorage.getItem('userId');
    axios.post(`http://localhost:8080/api/user/${userId}`, { ...updatedUser, updateAt: new Date() })
      .then(response => {
        setUser(response.data);
        setIsEdit(false);
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
      axios.delete(`http://localhost:8080/api/user/${userId}`)
        .then(response => {
          alert("사용자 계정이 삭제되었습니다.");
          // 계정 삭제 후에는 로그인 페이지로 리디렉션
          localStorage.removeItem('userId');
          window.location.href = "/login";
        })
        .catch(error => {
          console.error("There was an error deleting the user data!", error);
          alert("사용자 삭제에 실패했습니다.");
        });
    }
  };

  return (
    <div>
      {user && (
        <div>
          <h2>마이페이지</h2>
          <div>
            <p>이메일: {isEdit ? <input type="email" name="email" value={updatedUser.email} onChange={handleChange} /> : user.email}</p>
            <p>사용자명: {isEdit ? <input type="text" name="username" value={updatedUser.username} onChange={handleChange} /> : user.username}</p>
            <p>비밀번호: {isEdit ? <input type="password" name="password" value={updatedUser.password} onChange={handleChange} /> : '********'}</p>
            <p>아이디: {user.id}</p>
            <p>권한: {user.role}</p>
            <p>가입일: {user.createAt}</p>
            <p>수정일: {user.updateAt}</p>
            {!isEdit ? (
              <button onClick={handleEditClick}>수정</button>
            ) : (
              <div>
                <button onClick={handleSave}>저장</button>
                <button onClick={handleCancel}>취소</button>
              </div>
            )}
            {/* 삭제 버튼 추가 */}
            <button onClick={handleDelete}>계정 삭제</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mypage;