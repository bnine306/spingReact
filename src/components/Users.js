import React, { useState, useEffect } from 'react';
import '../cssfile/UserList.css';  // UserList.css 파일을 임포트
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // navigate 객체 생성

  useEffect(() => {
    // API 호출하여 회원 목록 가져오기
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);  // 응답 데이터 확인
        setUsers(data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="users-container">
      <h1>회원 목록</h1>
      <table>
        <thead>
          <tr>
            <th>아이디</th>
            <th>이메일</th>
            <th>사용자 이름</th>
            <th>권한</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
    </div>


  );
}

export default UserList;