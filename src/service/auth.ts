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
      console.log('user login or logout', user);
    });
  };
}

export default Auth;
