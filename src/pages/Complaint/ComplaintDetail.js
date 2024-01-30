import React from 'react';
import '../../style/ComplaintDetail.scss'; // SCSS 파일 임포트

const ComplaintDetail = ({ detailData }) => {
  if (!detailData) {
    return <div>Loading...</div>; // 또는 적절한 로딩 컴포넌트를 표시
  }

  return (
    <div className="complaint-detail-container">
      <h1>민원 상세 정보</h1>
      <div className="detail-row">
        <span className="detail-title">제목 : </span>
        <span className="detail-content">{detailData.title}</span>
      </div>
      <div className="detail-row">
        <span className="detail-title">민원 내용 : </span>
        <span className="detail-content">{detailData.content}</span>
      </div>
      <div className="detail-row">
        <span className="detail-title">건물 : </span>
        <span className="detail-content">{detailData.building}</span>
      </div>
      <div className="detail-row">
        <span className="detail-title">실습실 호실 : </span>
        <span className="detail-content">{detailData.room}</span>
      </div>
    </div>
  );
};

export default ComplaintDetail;
