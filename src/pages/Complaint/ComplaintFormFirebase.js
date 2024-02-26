import React, { useContext, useState, useLocation } from 'react';
import db from '../../firebase';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../../AuthContext';
import styles from '../../style/ComplaintForm.module.scss';
import { useModal } from '../../ModalContext';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

function ComplaintFormFirebase() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const { detailData } = location.state || {}; // state가 없는 경우를 대비한 기본값 설정

  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({}); // 유효성 검사 (사용자 입력값에 빈 항목 체크)

  const validateForm = () => {
    let newErrors = {};
    if (!complaint.title) newErrors.title = '제목을 입력해주세요.';
    if (!complaint.major) newErrors.major = '학과를 입력해주세요.';
    if (!complaint.content) newErrors.content = '내용을 입력해주세요.';
    if (!complaint.building) newErrors.building = '건물을 선택해주세요.';
    if (!complaint.category) newErrors.category = '카테고리를 선택해주세요.';
    if (!complaint.room) newErrors.room = '강의실의 호실을 입력해주세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [complaint, setComplaint] = useState({
    title: detailData ? detailData.title : '',
    major: detailData ? detailData.major : '',
    content: detailData ? detailData.content : '',
    building: detailData ? detailData.building : '',
    category: detailData ? detailData.category : '',
    room: detailData ? detailData.room : '',
    status: detailData ? detailData.status : 'accepting',
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
      if (detailData) {
        // 민원 수정 로직
        const docRef = doc(db, 'complaints', detailData.id);
        await updateDoc(docRef, { ...complaint });
        console.log('민원이 성공적으로 수정되었습니다.');
        openModal(
          <>
            <h2>알림</h2>
            <p>민원이 성공적으로 수정되었습니다.</p>
          </>,
        );
      } else {
        // 민원 생성 로직
        await addDoc(collection(db, 'complaints'), {
          ...complaint,
          userId: currentUser.uid,
          userName: currentUser.displayName,
          timestamp: new Date(),
        }).then(
          openModal(
            <>
              <h1>민원 접수 완료</h1> <br />
              <p>
                민원을 제출하여 주셔서 감사합니다. 빠른 시일 내에 처리하도록
                하겠습니다.
              </p>
              <br />
              <p>3초 후 자동으로 홈으로 돌아갑니다.</p>
            </>,
          ),
          setTimeout(() => {
            closeModal();
            navigate('/home');
          }, 3000), // 3초 후 홈으로 리다이렉트
        );

        console.log('민원이 성공적으로 접수 되었습니다.');
      }
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
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.mb3}>
        {detailData ? (
          <div className={styles.title}>민원 수정 페이지</div>
        ) : (
          <div className={styles.title}>민원 접수 페이지</div>
        )}

        <label htmlFor="title" className={styles.label}>
          민원 제목
        </label>
        <input
          type="text"
          className={styles.input}
          id="title"
          value={complaint.title}
          onChange={handleChange}
        />
        {errors.title && <div className={styles.error}>{errors.title}</div>}
      </div>

      <div className={styles.mb3}>
        <label htmlFor="major" className={styles.label}>
          학과
        </label>
        <input
          type="text"
          className={styles.input}
          id="major"
          value={complaint.major}
          onChange={handleChange}
        />
        {errors.title && <div className={styles.error}>{errors.major}</div>}
      </div>

      <div className={styles.mb3}>
        <label htmlFor="category" className={styles.label}>
          민원 카테고리
        </label>
        <select
          className={styles.select}
          id="category"
          value={complaint.category}
          onChange={handleChange}
        >
          <option value="">카테고리를 선택하세요</option>
          <option value="HW">하드웨어</option>
          <option value="SW">소프트웨어</option>
          <option value="facility">실습실 시설</option>
          <option value="etc">기타</option>
        </select>
        {errors.category && (
          <div className={styles.error}>{errors.category}</div>
        )}
      </div>

      <div className={styles.mb3}>
        <label htmlFor="content" className={styles.label}>
          민원 내용
        </label>
        <textarea
          className={styles.textarea}
          id="content"
          rows="3"
          value={complaint.content}
          onChange={handleChange}
          placeholder="민원을 작성해 주세요"
        ></textarea>
        {errors.content && <div className={styles.error}>{errors.content}</div>}
      </div>

      <div className={styles.mb3}>
        <label htmlFor="building" className={styles.label}>
          건물 선택
        </label>
        <select
          className={styles.select}
          id="building"
          value={complaint.building}
          onChange={handleChange}
        >
          <option value="">건물을 선택하세요</option>
          <option value="BY">배양관</option>
          <option value="HK">호천관</option>
          <option value="HH">흥학관</option>
          <option value="JD">지덕관</option>
          <option value="LB">도서관</option>
          <option value="NR">누리관</option>
          <option value="SE">서일관</option>
          <option value="SJ">세종관</option>
          {/* 여기에 추가적인 건물 옵션을 넣을 수 있습니다 */}
        </select>
        {errors.building && (
          <div className={styles.error}>{errors.building}</div>
        )}
      </div>

      <div className={styles.mb3}>
        <label htmlFor="room" className={styles.label}>
          강의실 호실 (예: 101호)
        </label>
        <input
          type="number"
          className={styles.input}
          id="room"
          value={complaint.room}
          onChange={handleChange}
          placeholder="예: 101"
        />
        {errors.room && <div className={styles.error}>{errors.room}</div>}
      </div>

      <button type="submit" className={styles.button}>
        민원 제출 하기
      </button>
    </form>
  );
}

export default ComplaintFormFirebase;
