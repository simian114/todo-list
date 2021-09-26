import { db, functions } from 'firebase';
import { getDoc } from 'firebase/firestore';
import { doc, collection } from 'firebase/firestore';

const usersRef = collection(db, 'users');

const Logger = functions.httpsCallable('userAuthLog');

const getUser = async (uid: string) => {
  const ref = doc(usersRef, uid);
  const docRef = await getDoc(ref);

  if (docRef.exists()) {
    console.log('login!');
    Logger({ type: 'login', user: uid });
    return docRef.data();
  } else return null;
};

const logoutUser = () => {
  console.log('logout!');
  Logger({ type: 'logout', user: 'somewhere..' });
};

export { getUser, logoutUser };
