import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import '../cssfile/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(''); // 로그인 실패 시 에러 메시지
  const navigate = useNavigate(); // navigate 객체 생성

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 로그인 요청을 위한 userDTO 생성
    const userDTO = { email, password };

    try {
      // 로그인 API 요청
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDTO),
      });

      const result = await response.json(); // 서버에서 응답 받기

      if (response.ok) {
        // 로그인 성공
        alert(result.message); // 서버에서 성공 메시지 출력
        localStorage.setItem('userId', result.id); // 로그인 성공 시 사용자 ID를 로컬스토리지에 저장
        navigate('/'); // 로그인 성공 후 홈으로 이동
      } else {
        // 로그인 실패 시 에러 메시지 출력
        setLoginError(result.message); 
      }
    } catch (error) {
      // 네트워크 오류 등 실패 처리
      setLoginError("서버와의 연결에 실패했습니다.");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>

      {/* 로그인 실패 시 에러 메시지 출력 */}
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

      {/* 홈으로 돌아가기 버튼 */}
      <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
    </div>
  );
}

export default Login;