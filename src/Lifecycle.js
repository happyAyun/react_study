import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!!");

    return () => {
      // Unmount 시점에 실행됨.
      console.log("Unmount!!");
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  //   const [count, setCount] = useState(0);
  //   const [text, setText] = useState("");

  //   useEffect(() => {
  //     console.log("Mount!!");
  //   }, []); // [] : (dependency array)가 변화하면 마운트 될 때만 콜백함수가 수행

  //   useEffect(() => {
  //     console.log("Update!!");
  //   }); // 디펜던시 어레이를 전달하지 않으면 됨.

  //   useEffect(() => {
  //     console.log(`count is update : ${count}`);
  //     if (count > 5) {
  //       alert("count가 5를 넘었습니다. 따라서 1로 초기화합니다");
  //       setCount(1);
  //     }
  //   }, [count]); // count가 업데이트 되면 콜백함수가 실행

  //   useEffect(() => {
  //     console.log(`text is update : ${text}`);
  //   }, [text]); // text

  return (
    <div style={{ padding: 20 }}>
      {/* <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div> */}
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div> // 단락회로평가 : isVisible이 true이면 && 이므로 뒤를 확인하고 UnmountTest가 입력되고
    // false이면 && 이므로 뒤를 확인하지 않으므로 UnmountTest가 입력되지 않는다.
  );
};

export default Lifecycle;
