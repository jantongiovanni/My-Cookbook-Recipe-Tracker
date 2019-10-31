import Firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBWeqq6Tnf08kKKWoSiH49-d1ts9I_G_xM",
    authDomain: "my-cookbook-rn.firebaseapp.com",
    databaseURL: "https://my-cookbook-rn.firebaseio.com",
    projectId: "my-cookbook-rn",
    storageBucket: "my-cookbook-rn.appspot.com",
    messagingSenderId: "150393592512",
    appId: "1:150393592512:web:420624fb30ce4d76516b25",
    measurementId: "G-TC8W15YQE2"
  }

//Initialize Firebase
// const Firebase = firebase.initializeApp(firebaseConfig);
// const db = Firebase.database();
// export default db;


let app = Firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
//export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
