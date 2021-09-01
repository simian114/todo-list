import React, { useEffect, useState } from 'react';
import { Input, Modal, Form, DatePicker, Radio, Alert } from 'antd';
import {
  Todo,
  TodoStatus,
  TodoPriority,
  TodoCategory,
  updateTodoRequest,
  UpdateTodo,
} from 'service/redux/slices/todosSlice';
import moment, { Moment } from 'moment';
import { useDispatch } from 'react-redux';
import { priorityConverter, statusConverter, categoryConverter } from 'utils';

interface EditTodoModalProps {
  visible: boolean;
  closeModal: () => void;
  todo: Todo;
}

export type EditTodo = {
  text: string;
  due: Moment;
  status: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory;
};

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  visible,
  closeModal,
  todo,
}) => {
  const [values, setValues] = useState<Partial<EditTodo> | null>(null);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const { user, due, createdAt, updatedAt, ...rest } = todo;
    setValues({ due: moment(due), ...rest });
  }, [todo]);
  if (!values) return <div></div>;

  const handleChange = (
    changedValues: { key: string; value: Moment | string },
    afterValues: EditTodo,
  ) => {
    setValues(afterValues);
    if (!afterValues.text) setError(true);
    else setError(false);
  };

  const handleUpdate = () => {
    // TODO: validation 검사해야함
    if (error) return;
    const { due, ...rest } = values;
    if (!due) return;
    const updateTodoDTO: UpdateTodo = {
      id: todo.id,
      due: due.toDate(),
      ...rest,
    };
    dispatch(updateTodoRequest({ updateTodo: updateTodoDTO }));
    closeModal();
  };
  return (
    <Modal
      visible={visible}
      centered
      title="TODO 수정"
      okText="수정"
      cancelText="닫기"
      onCancel={closeModal}
      onOk={handleUpdate}
    >
      <Form
        layout="horizontal"
        labelCol={{ span: 4 }}
        initialValues={values}
        onValuesChange={handleChange}
      >
        <Form.Item label="title" name="text">
          <Input value={values.text} placeholder="빈칸으로 두지 마세염" />
        </Form.Item>
        <Form.Item label="title" name="check">
          <div>최종적으로는 체크리스트를 만들예정</div>
        </Form.Item>
        <Form.Item label="완료 목표일" name="due">
          <DatePicker
            disabledDate={disabledDate}
            value={moment(values.due)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="진행상태" name="status">
          {RadioGroups('status')}
        </Form.Item>
        <Form.Item label="우선순위" name="priority">
          {RadioGroups('priority')}
        </Form.Item>
        <Form.Item label="카테고리" name="category">
          {RadioGroups('category')}
        </Form.Item>
      </Form>
      {error && (
        <Alert type="error" message="빈칸이 있어서는 안됩니다!" showIcon />
      )}
    </Modal>
  );
};

const RadioGroups = (type: 'status' | 'priority' | 'category') => {
  const status = [['시작안함', '진행중', '완료'], statusConverter];
  const priority = [['낮음', '중간', '높음'], priorityConverter];
  const category = [
    ['업무', '공부', '일상', '운동', '기타'],
    categoryConverter,
  ];
  const options = { status, priority, category };
  const maker = options[type] as [string[], (val: string) => string];
  return (
    <Radio.Group>
      {maker[0].map((data) => (
        <Radio.Button key={data} value={maker[1](data)}>
          {data}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

function disabledDate(current: Moment) {
  return current < moment().startOf('day');
}

export default EditTodoModal;
