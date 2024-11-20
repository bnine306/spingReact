import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../cssfile/Admin.css';

function Admin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // 사용자 목록 가져오기
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                setUsers(response.data);  // 사용자 데이터 받아서 상태 업데이트
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []); // 렌더링 시 한번만 실행

    return (
        <div>
            <h1>관리자 페이지</h1>
            {/* 홈 링크와 상품 추가 링크에 스타일 추가 */}
            <div className="admin-links">
                <Link to="/">홈</Link>
                <Link to="/productinput">상품 추가</Link>
            </div>

            <h2>회원 목록</h2>
            {/* 표 형식으로 출력 */}
            <table>
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>유저명</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;