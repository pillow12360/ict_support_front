import React from 'react';

const ComplaintListItem = ({ title, content, building }) => {
  return (
    <div className="ComplaintItem">
      <div className="title">민원 제목 {title}</div>
      <div className="content">민원 내용 {content} </div>
      <div className="building">건물 {building}</div>
    </div>
  );
};

export default ComplaintListItem;
