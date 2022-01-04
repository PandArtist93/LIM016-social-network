/* eslint-disable import/no-unresolved */
// Configuracion de Firebase

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';

import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  deleteDoc,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';

// La configuración de Firebase de nuestra aplicación web
const firebaseConfig = {
  apiKey: 'AIzaSyCaQ7ypqFXHu9ikarcZpoPLKq1t5KxNmic',
  authDomain: 'helppetsprueba2.firebaseapp.com',
  projectId: 'helppetsprueba2',
  storageBucket: 'helppetsprueba2.appspot.com',
  messagingSenderId: '455441875262',
  appId: '1:455441875262:web:660c2751c247dc85696c6f',
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
// Inicializar authentication
export const auth = getAuth(app);
// inicializa el firestore
export const db = getFirestore(app);
// inicializa el storage
export const storage = getStorage(app);
//
const proveedor = new GoogleAuthProvider();
const proveedorFB = new FacebookAuthProvider();

export {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  proveedor,
  proveedorFB,
  GoogleAuthProvider,
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  deleteDoc,
  onSnapshot,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
};
