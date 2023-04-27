import { initializeApp } from "firebase/app";
import { getStorage, listAll, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-vvJT8oz34ogGrhWd0i1dCOBO8D55ttw",
  authDomain: "image-uploader-c8255.firebaseapp.com",
  projectId: "image-uploader-c8255",
  storageBucket: "image-uploader-c8255.appspot.com",
  messagingSenderId: "242195429711",
  appId: "1:242195429711:web:75fb0936a9d568976c2d3a"
};

const app = initializeApp(firebaseConfig);
export { getStorage, listAll, ref, getDownloadURL, uploadBytesResumable, deleteObject, app };
