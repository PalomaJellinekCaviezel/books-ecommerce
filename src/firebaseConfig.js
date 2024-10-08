import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"
import { config } from './config'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    databaseURL: config.firebaseDatabaseURL,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Autenticación
export const auth = getAuth(app);

// Base de datos en tiempo real
export const database = getDatabase(app);
