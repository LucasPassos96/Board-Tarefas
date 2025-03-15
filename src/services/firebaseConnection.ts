
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCtPMaH41BnlhnQ3mhOp8N-EzRsp-1dpxA",
  authDomain: "board-tarefas-def6d.firebaseapp.com",
  projectId: "board-tarefas-def6d",
  storageBucket: "board-tarefas-def6d.firebasestorage.app",
  messagingSenderId: "699580981621",
  appId: "1:699580981621:web:a8fb284df62acfa175b33c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
export { db };