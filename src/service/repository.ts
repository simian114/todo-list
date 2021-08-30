import axios from 'axios';
import { firebaseDB } from '../firebase';

const baseurl = 'https://todo-sanam-default-rtdb.asia-southeast1.firebasedatabase.app/';

class Repository {
  async addTodo(userId: string) {
    // NOTE: 아래의 두 방법 모두 가능함. 어떤게 더 좋은걸까?
    // NOTE: success 를 사용할 수 있는 rest api 방법을 사용하도록하자.
    const newTodo = {
      name: 'test',
      age: 20,
    };
    const res = await axios.post(`${baseurl}/${userId}/todos.json`, newTodo);
    console.log(res);
  }
  getTodos(userId: string) {
    const dbRef = firebaseDB.ref(`${userId}/todos`);
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
    return dbRef.off;
  }
}
export default Repository;
