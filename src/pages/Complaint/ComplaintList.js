import React from 'react';
import ComplaintListItem from './ComplaintListItem';
import '../style/ComplaintList.scss';

const ComplaintList = ({ complaints }) => {
  return (
    <div className="CompalintList">
      {complaints.map((a) => {
        return (
          <ComplaintListItem
            key={a.id}
            title={a.title}
            content={a.content}
            building={a.building}
          />
        );
      })}
    </div>
  );
};

export default ComplaintList;
