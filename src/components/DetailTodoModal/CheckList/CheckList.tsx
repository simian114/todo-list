import React from 'react';
import { Todo, CheckList as ICheckList } from 'service/redux/slices/todosSlice';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      <h2>{t('Modal.CheckListTitle')}</h2>
      {todo.checkList.map((check, index) => (
        <StyledFormItem key={index}>
          <StyledCheckBox
            hidden={isEdit}
            checked={check.checked}
            name={`${index}`}
            onChange={handleCheckboxToggle}
          >
            {check.content || t('Modal.CheckItemPlaceholder')}
          </StyledCheckBox>
          <StyledCheckboxContainer>
            <StyledCheckboxInput
              name={`${index}`}
              hidden={!isEdit}
              value={check.content}
              onChange={handleChange}
              placeholder={t('Modal.CheckItemPlaceholder')}
            />
            <StyledButton
              hidden={!isEdit}
              onClick={() => handleDeleteCheckbox(index)}
            >
              {t('Modal.CheckListItemDelete')}
            </StyledButton>
          </StyledCheckboxContainer>
        </StyledFormItem>
      ))}
      <StyledButton hidden={isEdit} size="small" onClick={handleEditToggle}>
        {t('Modal.CheckListEdit')}
      </StyledButton>
      <StyledButton hidden={!isEdit} size="middle" onClick={handleEditToggle}>
        {t('Modal.CheckListClose')}
      </StyledButton>
      <StyledButton hidden={!isEdit} size="middle" onClick={handleAddCheckbox}>
        {t('Modal.CheckListAdd')}
      </StyledButton>
    </div>
  );
};

export default CheckList;
