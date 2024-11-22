import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import '../cssfile/SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate(); // navigate 객체 생성

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이메일 중복 체크를 포함한 회원가입 요청
    const userDTO = { email, username, password };

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDTO),
    });

    const result = await response.json(); // 서버에서 응답 받기

    if (response.ok) {
      //상황에 따른 메시지
      alert(result.message);
      navigate('/'); // 회원가입 성공 후 홈으로 이동
    } else {
      // 이메일 중복 처리
      setEmailError(result.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignUp;