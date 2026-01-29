const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, doc, setDoc } = require("firebase/firestore");
const { hash } = require("bcryptjs");

// We need to polyfill fetch for Firebase JS SDK in Node environment if not present (Node 18+ has it)
// But to be safe let's just use the compatible config.

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

async function main() {
    console.log("Seeding Firebase...");

    try {
        const adminEmail = "admin@reziko.com";
        const passwordHash = await hash("admin123", 10);

        // Seed Admin
        await setDoc(doc(db, "users", "admin"), {
            email: adminEmail,
            password: passwordHash,
            role: "admin"
        });
        console.log("Admin user created/updated.");

        // Seed Products
        const products = [
            {
                name: "Reziko Health Monitor",
                price: 199.99,
                type: "Device",
                description: "Advanced health monitoring wearable with real-time tracking.",
                createdAt: new Date().toISOString()
            },
            {
                name: "Immunity Booster Pack",
                price: 49.99,
                type: "Supplement",
                description: "Complete daily immunity support vitamins.",
                createdAt: new Date().toISOString()
            }
        ];

        for (const p of products) {
            // Just add, don't worry about duplicates for this simple seed
            await addDoc(collection(db, "products"), p);
        }
        console.log("Products seeded.");
    } catch (e) {
        console.error("Error seeding:", e);
    }

    console.log("Seeding complete.");
    // Force exit because Firestore connection keeps process alive
    process.exit(0);
}

main();
