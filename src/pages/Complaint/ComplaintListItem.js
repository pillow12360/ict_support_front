import React from 'react';

const ComplaintListItem = ({ title, content, building }) => {
  return (
    <div className="ComplaintItem">
      <div className="title">민원 제목 : {title}</div>
      <p className="content">민원 내용 : {content} </p>
      <div className="building">건물 : {building}</div>
    </div>
  );
};

export default ComplaintListItem;
