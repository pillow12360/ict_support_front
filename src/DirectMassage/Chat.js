import React, { useContext, useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import '../style/Chat.scss'; // 스타일 시트 임포트
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { realtimeDatabase } from '../firebase.js';
import { AuthContext } from '../contexts/AuthContext';
import { Outlet } from 'react-router-dom';

function Chat() {
  const [messages, setMessages] = useState([]); // 메시지 상태를 관리하는 상태 변수
  const { currentUser, userRole } = useContext(AuthContext);

  useEffect(() => {
    // 'messages' 경로의 참조 생성
    const dbRef = ref(realtimeDatabase, 'messages');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];

      if (data) {
        for (const key in data) {
          const messageItem = data[key];
          loadedMessages.push({
            id: key,
            sender: messageItem.sender,
            receiver: messageItem.receiver,
            message: messageItem.message,
            timestamp: messageItem.timestamp,
            read: messageItem.read,
          });
          loadedMessages.sort((a, b) => a.timestamp - b.timestamp); // 먼저 작성한 메시지가 위로 가도록 정렬
        }
      }

      // 메시지 상태 업데이트
      setMessages(loadedMessages);
    });

    // 컴포넌트 언마운트 시 리스너 정리
    return () => off(dbRef, 'value', unsubscribe);
  }, []);

  return (
    <div className="chat-container">
      <h2 className="chat-title">ICT 민원 처리 소통방</h2>
      <MessageList className="message-list" messages={messages} />
      <MessageInput currentUser={currentUser} />
      <Outlet />
    </div>
  );
}

export default Chat;
