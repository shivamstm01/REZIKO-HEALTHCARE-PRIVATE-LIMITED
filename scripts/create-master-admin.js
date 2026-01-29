const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const { hash } = require("bcryptjs");

const firebaseConfig = {
    apiKey: "AIzaSyCrTlHtOy8wUCKCS4EtJbAIDxx8nXjLQ3g",
    authDomain: "cspwala-c99b1.firebaseapp.com",
    projectId: "cspwala-c99b1",
    storageBucket: "cspwala-c99b1.firebasestorage.app",
    messagingSenderId: "911648525243",
    appId: "1:911648525243:web:740df4f1cc116c5921129e",
    measurementId: "G-MHKTRD3439"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createMasterAdmin() {
    console.log("Creating Master Admin...");

    try {
        const email = "admin@reziko.com";
        const password = "admin123";
        const passwordHash = await hash(password, 10);

        await setDoc(doc(db, "users", "admin"), {
            email: email,
            password: passwordHash,
            role: "admin",
            createdAt: new Date().toISOString()
        });

        console.log("------------------------------------------");
        console.log("SUCCESS: Master Admin Created");
        console.log(`Email:    ${email}`);
        console.log(`Password: ${password}`);
        console.log("------------------------------------------");
    } catch (e) {
        console.error("FAILED to create admin.", e);
        if (e.code === 'not-found' || (e.message && e.message.includes('NOT_FOUND'))) {
            console.error("\nPOSSIBLE CAUSE: The Firestore Database has not been created in the Firebase Console yet.");
            console.error("Please go to https://console.firebase.google.com/project/reziko-healthcare/firestore and click 'Create Database'.");
        }
    }

    process.exit(0);
}

createMasterAdmin();
