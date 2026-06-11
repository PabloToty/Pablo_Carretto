import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDNvDrVL2fKTG7M2qBJzC5StqZU14SFY0g",
    authDomain: "tudulceevento.firebaseapp.com",
    projectId: "tudulceevento",
    storageBucket: "tudulceevento.firebasestorage.app",
    messagingSenderId: "591244763669",
    appId: "1:591244763669:web:3a860ec6168e834423a41c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);