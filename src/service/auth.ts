import { firebaseAuth, githubProvider, googleProvider, firebaseApp } from '../firebase';

interface IAuth {
  login: (name: string) => void;
  getProvider: (name: string) => any;
}

class Auth implements IAuth {
  login(name: string) {
    const provider = this.getProvider(name);
    return firebaseAuth.signInWithPopup(provider);
  }
  logout() {
    firebaseApp.auth().signOut();
  }
  onAuthChange = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      console.log('here!!!', user);
    });
  };
  getProvider(name: any) {
    switch (name) {
      case 'Google':
        return googleProvider;
      case 'Github':
        return githubProvider;
      default:
        throw new Error('zz');
    }
  }
}

export default Auth;
