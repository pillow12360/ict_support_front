import React from 'react';
import '../style/MessageList.scss'; // 스타일 시트 임포트

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className="message-item">
          <span className="sender">{message.sender}:</span>
          <span className="message-text">{message.text}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
