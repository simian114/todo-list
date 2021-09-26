import { ERROR_MESSAGE } from 'utils/constants';
import {
  firebaseAuth,
  githubProvider,
  googleProvider,
  firebaseApp,
} from '../firebase';

interface IAuth {
  login: (name: string) => void;
}

// TODO: AuthProvider 의 타입 알아내기
const providerOptions: { [key: string]: any } = {
  Google: googleProvider,
  Github: githubProvider,
};

class Auth implements IAuth {
  login(name: string) {
    const provider = providerOptions[name];
    if (!!!provider) throw new Error(ERROR_MESSAGE.NO_EXIEST_PROVIDER);
    return firebaseAuth.signInWithPopup(provider);
  }
  logout() {
    firebaseApp.auth().signOut();
  }
  onAuthChange = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        // NOTE: 로그인 되었을 때 해야하는 동작을 등록해준다.
      } else {
        // NOTE: 로그아웃 되었을 때 해야하는 동작을 등록해준다.
      }
    });
  };
}

const auth = new Auth();
auth.onAuthChange();

export default auth;
