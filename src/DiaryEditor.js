import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
  const { onCreate } = useContext(DiaryDispatchContext);

  const authorInput = useRef(); // focus
  const contentInput = useRef();

  // state/setState로 묶어서 관리할 수 있음.
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      // alert("작성자는 최소 1글자 이상 입력해주세요");
      authorInput.current.focus(); // focus
      return;
    }

    if (state.content.length < 5) {
      // alert("일기 본문은 최소 5글자 이상 입력해주세요");
      contentInput.current.focus(); // focus
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    // console.log(state);
    alert("저장 성공");
    setState({
      // 저장 후 입력창 비우기
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
          // onChange={(e) => {
          //     setState({
          //         ...state, // 원래 값을 유지하도록 - 인자가 많으면 힘드니 이렇게! -> 순서 중요 제일 먼저!
          //         // author: state.author, // 원래 값을 유지함
          //         content: e.target.value, // 변화되는 값 -> ...state 후에
          //     });
          // }}
        />
      </div>
      <div>
        <textarea ref={contentInput} name="content" value={state.content} onChange={handleChangeState} />
      </div>
      <div>
        <select name="emotion" value={state.emotion} onChange={handleChangeState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};
export default React.memo(DiaryEditor);
