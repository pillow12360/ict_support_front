import React from 'react';
import '../../style/ComplaintDetail.scss'; // SCSS 파일 임포트
import AdminMenu from '../admin/AdminMenu';

const ComplaintDetail = ({ detailData, userRole }) => {
  if (!detailData) {
    return <div>상세 정보 페이지 불러오는 중...</div>; // 또는 적절한 로딩 컴포넌트를 표시
  }

  return (
    <div className="complaint-detail-container">
      <h1>민원 상세 정보</h1>
      <div className="detail-row">
        <span className="detail-title">제목 : </span>
        <span className="detail-content">{detailData.title}</span>
      </div>
      <div className="detail-row">
        <span className="detail-title">카테고리 : </span>
        <span className="detail-content">
          {(() => {
            switch (detailData.category) {
              case 'SW':
                return '소프트웨어';
              case 'HW':
                return '하드웨어';
              case 'facility':
                return '실습실 시설';
              case 'etc':
                return '기타';
              default:
                return '알 수 없음';
            }
          })()}
        </span>
      </div>
      <div className="detail-row">
        <span className="detail-title">민원 내용 : </span>
        <span className="detail-content">{detailData.content}</span>
      </div>
      <div className="detail-row">
        <span className="detail-title">건물 : </span>
        <span className="detail-content">
          {(() => {
            switch (detailData.building) {
              case 'BY':
                return '배양관';
              case 'HK':
                return '호천관';
              case 'HH':
                return '흥학관';
              case 'JD':
                return '지덕관';
              case 'LB':
                return '도서관';
              case 'NR':
                return '누리관';
              case 'SE':
                return '서일관';
              case 'SJ':
                return '세종관';
              default:
                return '알 수 없음'; // 건물 코드가 일치하지 않는 경우
            }
          })()}
        </span>
      </div>
      <div className="detail-row">
        <span className="detail-title">실습실 호실 : </span>
        <span className="detail-content">{detailData.room}</span>
      </div>
      <div className="detail-row">
        <span className="detail-title">민원 처리 상태 : </span>
        <span className="detail-content">
          {(() => {
            switch (detailData.status) {
              case 'accepting':
                return '처리 중';
              case 'received':
                return '접수 완료';
              case 'not_accepted':
                return '접수 불가';
              case 'in_progerss':
                return '처리 중';
              case 'completed':
                return '처리 완료';
              case 'unresolvable':
                return '처리 불가';
              default:
                return '알 수 없음';
            }
          })()}
        </span>
      </div>
      <div>
        {userRole === 'admin' ? <AdminMenu detailData={detailData} /> : null}
      </div>
    </div>
  );
};

export default ComplaintDetail;
