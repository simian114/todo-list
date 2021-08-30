import axios from 'axios';

const baseurl =
  'https://todo-sanam-default-rtdb.asia-southeast1.firebasedatabase.app/';

const getAll = async (userId: string) => {
  const res = await axios.get(`${baseurl}/${userId}/todos.json`);
  return res.data;
};

export { getAll };
