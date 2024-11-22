import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../cssfile/Admin.css';

function Admin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // 사용자 목록 가져오기
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);  // 사용자 데이터 받아서 상태 업데이트
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []); // 렌더링 시 한번만 실행

    return (
        <div className="admin-container">
            <h1>관리자 페이지</h1>
            <div className="admin-links">
                <Link to="/productinput">상품 추가</Link>
            </div>

            <div className="users-container">
                <h2>회원 목록</h2>
                <table>
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>이메일</th>
                            <th>사용자 이름</th>
                            <th>권한</th>
                            <th>관리자 작업</th> {/* 작업 칼럼을 마지막으로 옮김 */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>
                                    {/* 요청을 보내지 않고 버튼만 표시 */}
                                    <button className="delete-button">계정 삭제</button>
                                    <button className="role-button">권한 부여</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;