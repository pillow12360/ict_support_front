import React from 'react';
import '../../style/ComplaintDetail.scss'; // SCSS 파일 임포트

const ComplaintDetail = ({ prop }) => {
  return (
    <div className="complaint-detail-container">
      <h1>민원 상세 정보</h1>
      <div className="detail-row">
        <span className="detail-title">제목 : </span>
        <span className="detail-content">{prop.title}</span>
      </div>
      <div className="detail-row">
        <span className="detail-title">민원 내용 : </span>
        <span className="detail-content">{prop.content}</span>
      </div>
      <div className="detail-row">
        <span className="detail-title">건물 : </span>
        <span className="detail-content">{prop.building}</span>
      </div>
      <div className="detail-row">
        <span className="detail-title">실습실 호실 : </span>
        <span className="detail-content">{prop.room}</span>
      </div>
    </div>
  );
};

export default ComplaintDetail;
