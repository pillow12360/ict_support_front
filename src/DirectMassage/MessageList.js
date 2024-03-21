import React from 'react';
import '../style/MessageList.scss'; // 스타일 시트 임포트

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className="message-item">
          <span className="sender">{message.sender}</span>
          <span className="message-text">{message.message}</span>
          <span className="read-status">
            {message.read ? '읽음' : '읽지 않음'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
