import DiaryItem from "./DiaryItem";

const DiaryList = ({ onEdit, onRemove, diaryList }) => {
  console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
          //   <div key={it.id}>
          //     <div>작성자 : {it.author}</div>
          //     <div>일기 : {it.content}</div>
          //     <div>감정 : {it.emotion}</div>
          //     <div>작성시간 : {it.create_date}</div>
          //   </div>
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  // 에러방지
  diaryList: [],
};
export default DiaryList;
