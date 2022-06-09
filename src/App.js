import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import OptimizeTest from "./OptimizeTest";
// import Lifecycle from "./Lifecycle";

// const dummyList = [
// {
//   id: 1,
//   author: "심아윤",
//   content: "하이1",
//   emotion: 5,
//   create_date: new Date().getTime(), // Date(): 현재시간
// },
// {
//   id: 2,
//   author: "심아윤",
//   content: "하이2",
//   emotion: 2,
//   create_date: new Date().getTime(), // Date(): 현재시간
// },
// {
//   id: 3,
//   author: "심아윤",
//   content: "하이3",
//   emotion: 3,
//   create_date: new Date().getTime(), // Date(): 현재시간
// },
// ];
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const create_date = new Date().getTime();
      const newItem = {
        ...action.data,
        create_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) => (it.id !== action.targetId ? { ...it, content: action.newContent } : it));
    }
    default:
      return state;
  }
};

function App() {
  // const [data, setData] = useState([]);

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments").then((res) => res.json());
    console.log(res);

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random * 5) + 1,
        create_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({ type: "INIT", data: initData });
  };

  // mount될 때 일기 데이터를 가져옴.
  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    // 함수 재생성, 최신의 data를 위한 함수형 업데이트(setData)
    // 콜백함수 재사용 (useCallback)

    dispatch({ type: "CREATE", data: { author, content, emotion, id: dataId.current } });
    // dispatch는 함수형 업데이트 필요없다

    // const create_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   create_date,
    //   id: dataId.current,
    // };
    dataId.current += 1;
    // setData((data) => [newItem, ...data]); // 새로작성한 item이 가장 먼저 들어가도록
  }, []); // [] 이므로 가장 마지막 data는 [] (빈배열)이 되므로 data가 하나만 들어가게 된다.
  // 따라서 setData()는 값 뿐아니라 함수형 인자도 가능하므로 data를 인자로 받아 항상 최신의 data를 참고할 수 있도록 한다.
  // 최신의 data에 newItem을 새로 추가한다

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
    // console.log(`${targetId}가 삭제되었습니다`);
    // 아래 두줄을 최적화 하기 위해 위 setData처럼 함수형으로 바꿈
    // const newDiaryList = data.filter((it) => it.id !== targetId);
    // setData(newDiaryList);
    // setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
    // setData((data) => data.map((it) => (it.id === targetId ? { ...it, content: newContent } : it)));
  }, []); // 최적화

  const getDiaryAnalysis = useMemo(() => {
    // useMemo : 메모이제이션 vs React.memo : 불필요한 리렌더링 방지
    // console.log("일기 분석 시작");
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); // data.length가 변화할 때만

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // useMemo()로 부터 값을 리턴받는 것임.

  return (
    <div className="App">
      {/* <OptimizeTest /> */}
      {/* <Lifecycle /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {data.length}</div>
      <div>기분 나쁜 일기 개수 : {data.length}</div>
      <div>기분 좋은 일기 비율 : {data.length}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
