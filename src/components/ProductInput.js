import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../cssfile/ProductInput.css';  // 스타일을 임포트

function ProductInput() {
    const [productnum, setProductnum] = useState('');
    const [arrivaldate, setArrivaldate] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imageurl, setImageurl] = useState(null);
    const [content, setContent] = useState(''); // 상품 설명 상태
    const [error, setError] = useState('');
    const [showCategoryOptions, setShowCategoryOptions] = useState(false);
    const navigate = useNavigate();

    // 폼 제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productnum || !arrivaldate || !price || !category || !imageurl || !content) {
            setError('입력 값을 비우지 마세요.');
            return;
        }

        const formData = new FormData();
        formData.append('productnum', productnum);
        formData.append('arrivaldate', arrivaldate);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', imageurl); // 여기를 'image'로 수정
        formData.append('content', content); // 상품 설명 추가

        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        try {
            console.log('FormData:', formData);
            const response = await fetch('/api/productinput', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('상품 추가 실패');
            }

            const data = await response.json();
            console.log('상품 추가 완료', data);

            // 상품 추가 성공 시 얼럿 표시
            alert('상품이 성공적으로 추가되었습니다!');
            navigate('/productinput'); // 상품 추가 후 페이지 이동
        } catch (error) {
            console.error('Error:', error);
            setError('상품 추가 중 오류 발생');
        }
    };

    // 이미지 파일 선택 시 상태 업데이트
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageurl(file);
            console.log('선택된 파일:', file);
        }
    };

    // 카테고리 선택
    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setShowCategoryOptions(false); // 선택 후 옵션 목록 숨기기
    };

    // 홈으로 가는 버튼 클릭 핸들러
    const goHome = () => {
        navigate('/');  // 홈 페이지로 이동
    };

    return (
        <div className="product-input-container">
            <div className="header-container">
                <h2>상품 등록</h2>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
                {/* 카테고리 선택 드롭다운 */}
                <div>
                    <button
                        type="button"
                        className={`category-button ${category ? 'selected' : ''}`}
                        onClick={() => setShowCategoryOptions(!showCategoryOptions)}
                    >
                        {category || '카테고리 선택'}
                    </button>
                    {showCategoryOptions && (
                        <ul className="category-dropdown category-list">
                            {['봄', '여름', '가을', '겨울'].map((cat) => (
                                <li
                                    key={cat}
                                    onClick={() => handleCategorySelect(cat)}
                                    className={category === cat ? 'selected' : ''}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <input
                    type="text"
                    value={productnum}
                    onChange={(e) => setProductnum(e.target.value)}
                    placeholder="제품 번호"
                />
                <input
                    type="date"
                    value={arrivaldate}
                    onChange={(e) => setArrivaldate(e.target.value)}
                    placeholder="입고일"
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="가격"
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="상품 설명"
                    rows="4"
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">등록하기</button>
            </form>
        </div>
    );
}

export default ProductInput;