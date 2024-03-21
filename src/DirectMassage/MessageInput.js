import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import '../style/MessageInput.scss'; // 스타일 시트 임포트

function MessageInput({ currentUser }) {
  const [message, setMessage] = useState('');
  const database = getDatabase(); // Firebase Realtime Database 인스턴스 가져오기
  const sender = currentUser.displayName;

  const handleSubmit = (event) => {
    event.preventDefault();

    // 메시지 객체 생성
    const newMessage = {
      sender: sender, // 예시용. 실제로는 현재 사용자의 ID를 사용해야 합니다.
      receiver: 'user2', // 예시용. 실제로는 메시지 받는 사람의 ID를 사용해야 합니다.
      message: message,
      timestamp: Date.now(), // 메시지 전송 시각
      read: false, // 메시지 읽음 여부 초기값은 false
    };

    // 'messages' 경로에 새 메시지 객체를 push하여 데이터베이스에 저장
    push(ref(database, 'messages'), newMessage);

    // 입력 필드 초기화
    setMessage('');
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="보낼 메시지를 입력해주세요"
        />
        <button type="submit" className="send-button">
          전송
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
