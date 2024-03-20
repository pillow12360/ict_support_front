import React, { useContext, useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import '../style/Chat.scss'; // 스타일 시트 임포트
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { realtimeDatabase } from '../firebase/firebase.js';
import { AuthContext } from '../contexts/AuthContext';

function Chat() {
  const [messages, setMessages] = useState([]); // 메시지 상태를 관리하는 상태 변수
  const { currentUser, userRole } = useContext(AuthContext);

  useEffect(() => {
    const dbRef = ref(realtimeDatabase, 'messages'); // 'messages'는 메시지를 저장하는 데이터베이스 내의 경로입니다.
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (const key in data) {
        loadedMessages.push({
          id: key,
          ...data[key],
        });
      }
      setMessages(loadedMessages); // 상태 업데이트
    });

    return () => off(dbRef, 'value', unsubscribe); // 컴포넌트 언마운트 시 리스너 정리
  }, []);

  return (
    <div className="chat-container">
      <h2 className="title">Direct Message</h2>
      <MessageList messages={messages} />
      <MessageInput />
    </div>
  );
}

export default Chat;
