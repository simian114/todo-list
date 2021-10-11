import { db, functions } from 'firebase';
import { getDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

const Logger = functions.httpsCallable('userAuthLog');

const getUser = async (uid: string) => {
  const user = await getDoc(doc(db, `users/${uid}`));
  if (user.exists()) return;
  await setDoc(doc(db, 'users', uid), { user: uid, todos: [] });
};

const logoutUser = () => {
  console.log('logout!');
  Logger({ type: 'logout', user: 'somewhere..' });
};

export { getUser, logoutUser };
