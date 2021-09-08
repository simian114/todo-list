import React, { useState } from 'react';
import { Moment } from 'moment';

type TodoInitialValue = {
  title: string;
  due: Moment;
  status: string;
  category: string;
  priority: string;
};

const useTodoForm = (todoInitialValue: TodoInitialValue) => {
  const [values, setValues] = useState(todoInitialValue);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValues({
      ...values,
      title,
    });
  };

  const handleDateChange = (date: Moment | null) => {
    if (!date) return;
    setValues({
      ...values,
      due: date,
    });
  };

  const handleChangeCategory = ({ key }: { key: string }) => {
    setValues({ ...values, category: key });
  };

  const handleChangePriority = ({ key }: { key: string }) => {
    setValues({ ...values, priority: key });
  };

  const initValues = () => {
    setValues({ ...todoInitialValue });
  };
  return {
    values,
    handleInputChange,
    handleDateChange,
    handleChangeCategory,
    handleChangePriority,
    initValues,
  };
};

export default useTodoForm;
