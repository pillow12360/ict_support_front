import React from 'react';
import ComplaintListItem from './ComplaintListItem';
import './ComplaintList.scss';

const List = [
  {
    title: '안녕',
    content: '테스트',
    building: '배양관',
  },
  {
    title: '안녕2',
    content: '테스트3',
    building: '배양관123',
  },
  {
    title: '안녕3',
    content: '테스트2',
    building: '배양관31',
  },
];

const ComplaintList = () => {
  return (
    <div className="CompalintList">
      {List.map((a) => {
        return (
          <ComplaintListItem
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
