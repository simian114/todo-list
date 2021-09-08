import React from 'react';
import { Todo, CheckList as ICheckList } from 'service/redux/slices/todosSlice';
import {
  StyledFormItem,
  StyledCheckBox,
  StyledCheckboxContainer,
  StyledCheckboxInput,
  StyledButton,
} from './styles';

interface CheckListProps {
  todo: Todo;
  isEdit: boolean;
  handleEditToggle: () => void;
  setTodo: (val: any) => void;
}
const CheckList: React.FC<CheckListProps> = ({
  todo,
  isEdit,
  handleEditToggle,
  setTodo,
}) => {
  const makeNewCheckList = () => todo.checkList.map((item) => ({ ...item }));
  const setTodoCheckList = (checkList: ICheckList) => {
    setTodo({
      ...todo,
      checkList,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckList = makeNewCheckList();
    newCheckList[+e.target.name].content = e.target.value;
    setTodoCheckList(newCheckList);
  };
  const handleCheckboxToggle = (e: any) => {
    const newCheckList = makeNewCheckList();
    newCheckList[+e.target.name].checked = e.target.checked;
    setTodoCheckList(newCheckList);
  };
  const handleAddCheckbox = () => {
    const newCheckList = makeNewCheckList();
    newCheckList.push({ checked: false, content: '' });
    setTodoCheckList(newCheckList);
  };
  const handleDeleteCheckbox = (index: number) => {
    const newCheckList = makeNewCheckList();
    newCheckList.splice(index, 1);
    setTodoCheckList(newCheckList);
  };

  return (
    <div>
      <h2>체크리스트</h2>
      {todo.checkList.map((check, index) => (
        <StyledFormItem key={index}>
          <StyledCheckBox
            hidden={isEdit}
            checked={check.checked}
            name={`${index}`}
            onChange={handleCheckboxToggle}
          >
            {check.content || '내용을 넣어주세요 :)'}
          </StyledCheckBox>
          <StyledCheckboxContainer>
            <StyledCheckboxInput
              name={`${index}`}
              hidden={!isEdit}
              value={check.content}
              onChange={handleChange}
              placeholder="내용을 넣어주세요 :)"
            />
            <StyledButton
              hidden={!isEdit}
              onClick={() => handleDeleteCheckbox(index)}
            >
              삭제
            </StyledButton>
          </StyledCheckboxContainer>
        </StyledFormItem>
      ))}
      <StyledButton hidden={isEdit} size="small" onClick={handleEditToggle}>
        수정
      </StyledButton>
      <StyledButton hidden={!isEdit} size="middle" onClick={handleEditToggle}>
        닫기
      </StyledButton>
      <StyledButton hidden={!isEdit} size="middle" onClick={handleAddCheckbox}>
        추가
      </StyledButton>
    </div>
  );
};

export default CheckList;
