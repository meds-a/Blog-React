 import firebase from 'firebase/app';
 import 'firebase/auth';

 let firebaseConfig = {
        apiKey: "AIzaSyD03bZ2Xs_2PyitGiw63_WwFMvqHYrPg9A",
        authDomain: "blog-react-f43e3.firebaseapp.com",
        databaseURL: "https://blog-react-f43e3-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "blog-react-f43e3",
        storageBucket: "blog-react-f43e3.appspot.com",
        messagingSenderId: "224502668449",
        appId: "1:224502668449:web:2839bdef54a8501545a4e0"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;