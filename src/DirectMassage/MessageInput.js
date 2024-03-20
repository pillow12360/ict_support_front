import React, { useState } from 'react';
import '../style/MessageInput.scss'; // 스타일 시트 임포트

function MessageInput() {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
