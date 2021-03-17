import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCWol6vRMzD-OlObXGgerVzhe8v16_yd18",
    authDomain: "product-list-d3a78.firebaseapp.com",
    projectId: "product-list-d3a78",
    storageBucket: "product-list-d3a78.appspot.com",
    messagingSenderId: "49811751338",
    appId: "1:49811751338:web:13cfdc6aff2d5d57226bd3"
});

const db = firebaseApp.firestore();

export default db;
