import React, { useState, useEffect } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count ${count}`);
  });
  return <div>{count}</div>;
});

const CounterB = ({ obj }) => {
  // React.memo() : 객체를 비교할 때는 얕은 비교(주소 비교)를 하기 때문에 리로드됨
  useEffect(() => {
    console.log(`CounterB Update - count ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count;
  //   if (prevProps.obj.count === nextProps.obj.count) {
  //     return true; // 이전 프롭스 현재 프로스가 같다. -> 리렌더링을 일으키지 않는다.
  //   }
  //   return false; // 이전과 현재가 다르다 => 리렌더링을 일으켜라
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B Button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
