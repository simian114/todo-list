import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Modal, Form, DatePicker, Radio, Alert } from 'antd';
import moment, { Moment } from 'moment';
import {
  Todo,
  TodoStatus,
  TodoPriority,
  TodoCategory,
  updateTodoRequest,
  UpdateTodo,
} from 'service/redux/slices/todosSlice';
import { priorityConverter, statusConverter, categoryConverter } from 'utils';
import { useTranslation, TFunction } from 'react-i18next';

const { TextArea } = Input;
interface EditTodoModalProps {
  visible: boolean;
  closeModal: () => void;
  todo: Todo;
}

export type EditTodo = {
  title: string;
  due: Moment;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory;
};

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  visible,
  closeModal,
  todo,
}) => {
  const { t, i18n } = useTranslation();
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
    if (!afterValues.title) setError(true);
    else setError(false);
  };

  const handleUpdate = () => {
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
      title={t('Modal.EditTitle')}
      okText={t('Modal.EditOkText')}
      cancelText={t('Modal.EditCancleText')}
      onCancel={closeModal}
      onOk={handleUpdate}
    >
      <Form
        layout="horizontal"
        labelCol={{ span: 4 }}
        initialValues={values}
        onValuesChange={handleChange}
      >
        <Form.Item label={t('Modal.EditFormTitle')} name="title">
          <Input
            value={values.title}
            placeholder={t('Modal.EditFormTitlePlaceholder')}
          />
        </Form.Item>
        <Form.Item label={t('Modal.EditFormDesc')} name="description">
          <TextArea
            value={values.description}
            placeholder={t('Modal.EditFormDescPlaceholder')}
            autoSize={{ minRows: 2, maxRows: 2 }}
          />
        </Form.Item>
        <Form.Item label={t('Modal.EditFormTargetDate')} name="due">
          <DatePicker
            disabledDate={disabledDate}
            value={moment(values.due)}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label={t('Modal.EditFormStatus')} name="status">
          {RadioGroups('status', t, i18n.language)}
        </Form.Item>

        <Form.Item label={t('Modal.EditFormPriority')} name="priority">
          {RadioGroups('priority', t, i18n.language)}
        </Form.Item>

        <Form.Item label={t('Modal.EditFormCategory')} name="category">
          {RadioGroups('category', t, i18n.language)}
        </Form.Item>
      </Form>
      {error && (
        <Alert
          type="error"
          message={t('Modal.EditFormErrorMessage')}
          showIcon
        />
      )}
    </Modal>
  );
};

const RadioGroups = (
  type: 'status' | 'priority' | 'category',
  t: TFunction<'translation', undefined>,
  lng: string,
) => {
  const status = [
    [
      t(`status.notStarted`, { lng }),
      t(`status.onGoing`, { lng }),
      t(`status.completed`, { lng }),
    ],
    statusConverter,
  ];
  const priority = [
    [
      t(`priority.low`, { lng }),
      t(`priority.middle`, { lng }),
      t(`priority.high`, { lng }),
    ],
    priorityConverter,
  ];
  const category = [
    [
      t(`category.work`, { lng }),
      t(`category.study`, { lng }),
      t(`category.life`, { lng }),
      t(`category.exercise`, { lng }),
      t(`category.etc`, { lng }),
    ],
    categoryConverter,
  ];
  const options = { status, priority, category };
  const maker = options[type] as [string[], (val: string) => string];
  return (
    <Radio.Group>
      {maker[0].map((data) => (
        <Radio.Button key={data} value={lng === 'en' ? data : maker[1](data)}>
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
