import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../cssfile/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDTO = { email, password };

    setLoading(true); // 로딩 시작

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDTO),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        localStorage.setItem('userId', result.id);
        navigate('/');
      } else {
        setLoginError(result.message);
      }
    } catch (error) {
      setLoginError("서버와의 연결에 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 끝
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
        <button type="submit" disabled={loading}>
          {loading ? "로딩 중..." : "로그인"}
        </button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
}

export default Login;