import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeButton from '../../layout/HomeButton';

// 3개의 state => 1개의 객체 state
// porps 로 넘겨받은 setCompalint로 home 상태 변경

function ComplaintForm(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [building, setBuilding] = useState('');

  const [complaintsObj, setCompalintObj] = useState({
    id: 1,
    title: '',
    content: '',
    building: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // try {
    //   fetch();
    // } catch {};

    // api
    console.log({ title, content, building });
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
          value={complaintsObj.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          민원 내용
        </label>
        <textarea
          className="form-control"
          id="content"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="building" className="form-label">
          건물 선택
        </label>
        <select
          className="form-select"
          id="building"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
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

export default ComplaintForm;
