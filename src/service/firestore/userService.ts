import { db } from 'firebase';
import { getDoc } from 'firebase/firestore';
import { doc, collection, setDoc } from 'firebase/firestore';

const usersRef = collection(db, 'users');

const getUser = async (uid: string) => {
  const ref = doc(usersRef, uid);
  const docRef = await getDoc(ref);
  if (docRef.exists()) {
    return docRef.data();
  } else return null;
};

const registerUser = async (uid: string) => {
  const newUserRef = doc(usersRef, uid);
  await setDoc(newUserRef, {
    todos: [],
    user: uid,
  });
};

export { registerUser, getUser };
