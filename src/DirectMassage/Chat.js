import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import '../style/Chat.scss'; // 스타일 시트 임포트

function Chat() {
  return (
    <div className="chat-container">
      <h2 className="title">Direct Message</h2>
      <MessageList />
      <MessageInput />
    </div>
  );
}

export default Chat;
