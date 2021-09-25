import { db, functions } from 'firebase';
import { getDoc } from 'firebase/firestore';
import { doc, collection, setDoc } from 'firebase/firestore';

const usersRef = collection(db, 'users');

const Logger = functions.httpsCallable('userLogger');

const getUser = async (uid: string) => {
  const ref = doc(usersRef, uid);
  const docRef = await getDoc(ref);

  if (docRef.exists()) {
    Logger({ type: 'login', user: uid });
    return docRef.data();
  } else return null;
};

const registerUser = async (uid: string) => {
  const newUserRef = doc(usersRef, uid);
  await setDoc(newUserRef, {
    todos: [],
    user: uid,
  });
  Logger({ type: 'signup', user: uid });
};

const logoutUser = () => {
  Logger({ type: 'logout', user: 'somewhere..' });
};

export { registerUser, getUser, logoutUser };
