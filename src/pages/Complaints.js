import React, { useState } from "react";

const Complaints = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [building, setBuilding] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기서 폼 데이터를 처리합니다.
    console.log({ title, content, building });
  };

  return (
    <div>
      <h1>민원접수 페이지</h1>
      <form>
        민원 제목 :{" "}
        <input
          placeholder="민원 제목"
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        민원 내용 :{" "}
        <input
          placeholder="민원 내용"
          type="text"
          id="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default Complaints;
