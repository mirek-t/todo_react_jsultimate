import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCWdiQzXqmLQuBG3to5e5nv_fG3ENhypl4",
  authDomain: "todo-mt.firebaseapp.com",
  projectId: "todo-mt",
  storageBucket: "todo-mt.appspot.com",
  messagingSenderId: "77163968064",
  appId: "1:77163968064:web:3de66cce1f6816607651a5",
};

const app = initializeApp(firebaseConfig);

export default app;
