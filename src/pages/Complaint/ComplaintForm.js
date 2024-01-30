import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import styles from '../../style/ComplaintForm.module.scss';
import { useModal } from '../../ModalContext';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import axios from '../../../node_modules/axios/index';

function ComplaintForm(props) {
  const { currentUser } = useContext(AuthContext);
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const uri = 'http://localhost:8080/api/complaints/create-complaint';

  const [errors, setErrors] = useState({}); // 유효성 검사 (사용자 입력값에 빈 항목 체크)
  const validateForm = () => {
    let newErrors = {};
    if (!complaint.title) newErrors.title = '제목을 입력해주세요.';
    // if (!complaint.major) newErrors.major = '학과를 입력해주세요.';
    if (!complaint.content) newErrors.content = '내용을 입력해주세요.';
    if (!complaint.building) newErrors.building = '건물을 선택해주세요.';
    if (!complaint.category) newErrors.category = '카테고리를 선택해주세요.';
    if (!complaint.room_number)
      newErrors.room_number = '강의실의 호실을 입력해주세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [complaint, setComplaint] = useState({
    title: '',
    // major: '',
    content: '',
    building: '',
    category: '',
    room_number: '',
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
      const pushData = {
        ...complaint,
        // userId: currentUser.uid,
        // userName: currentUser.displayName,
        // timestamp: new Date(),
      };

      console.log(`pushData : ${pushData}`);

      axios
        .post(uri, pushData)
        .then((res) => {
          console.log(res);
          openModal(
            <>
              <h1>민원 접수 성공</h1>
            </>,
          );
        })
        .catch((error) => {
          console.error(error);
          openModal(
            <>
              <h1>민원 접수 실패</h1>
            </>,
          );
        });
    } catch {
      console.log('에러발생');
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

      {/* <div className={styles.mb3}>
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
      </div> */}

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
        <label htmlFor="room_number" className={styles.label}>
          강의실 호실 (예: 101호)
        </label>
        <input
          type="number"
          className={styles.input}
          id="room_number"
          value={complaint.room_number}
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

export default ComplaintForm;
