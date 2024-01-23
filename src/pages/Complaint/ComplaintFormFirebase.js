import React, { useContext, useState } from 'react';
import HomeButton from '../../layout/HomeButton';
import db from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { AuthContext } from '../../AuthContext';
// 3개의 state => 1개의 객체 state
// porps 로 넘겨받은 setCompalint로 home 상태 변경

function ComplaintFormFirebase(props) {
  const { currentUser } = useContext(AuthContext);

  const [errors, setErrors] = useState({}); // 유효성 검사 (사용자 입력값에 빈 항목 체크)
  const validateForm = () => {
    let newErrors = {};
    if (!complaint.title) newErrors.title = '제목을 입력해주세요.';
    if (!complaint.content) newErrors.content = '내용을 입력해주세요.';
    if (!complaint.building) newErrors.building = '건물을 선택해주세요.';
    if (!complaint.category) newErrors.category = '카테고리를 선택해주세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [complaint, setComplaint] = useState({
    title: '',
    content: '',
    building: '',
    category: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
      console.log('폼에 빈 필드가 있습니다.');
      return;
    }
    console.log(complaint);

    if (!currentUser) {
      alert('로그인이후 이용 가능합니다.');
      return;
    }

    try {
      await addDoc(collection(db, 'complaints'), {
        ...complaint,
        userId: currentUser.uid,
        timestamp: new Date(),
      });
      console.log('민원이 성공적으로 접수 되었습니다.');
    } catch (error) {
      console.error('민원 추가 중 오류 발생:', error);
    }
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setComplaint((prevComplaint) => ({
      ...prevComplaint,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          민원 제목
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={complaint.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          민원 카테고리
        </label>
        <select
          className="form-select"
          id="category"
          value={complaint.category}
          onChange={handleChange}
        >
          <option value="">카테고리를 선택하세요</option>
          <option value="category1">하드웨어</option>
          <option value="category2">소프트웨어</option>
          <option value="category3">실습실 시설</option>
          <option value="category4">기타</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          민원 내용
        </label>
        <textarea
          className="form-control"
          id="content"
          rows="3"
          value={complaint.content}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="building" className="form-label">
          건물 선택
        </label>
        <select
          className="form-select"
          id="building"
          value={complaint.building}
          onChange={handleChange}
        >
          <option value="">건물을 선택하세요</option>
          <option value="building1">배양관</option>
          <option value="building2">호천관</option>
          <option value="building3">흥학관</option>
          {/* 여기에 추가적인 건물 옵션을 넣을 수 있습니다 */}
        </select>
      </div>
      <button type="submit" className="btn btn-success">
        민원 제출 하기
      </button>
      <HomeButton />
    </form>
  );
}

export default ComplaintFormFirebase;
