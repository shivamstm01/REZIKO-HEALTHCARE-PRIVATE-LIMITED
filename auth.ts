import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { authConfig } from './auth.config';
import { db } from './lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                const email = credentials.email as string;
                const password = credentials.password as string;

                try {
                    // 1. Try fetching user from Firestore
                    let userData: any = null;
                    try {
                        let userDoc = await getDoc(doc(db, "users", "admin"));
                        userData = userDoc.exists() ? userDoc.data() : null;

                        if (!userData || userData.email !== email) {
                            const q = query(collection(db, "users"), where("email", "==", email));
                            const querySnapshot = await getDocs(q);
                            if (!querySnapshot.empty) {
                                userData = querySnapshot.docs[0].data();
                            }
                        }
                    } catch (firestoreError) {
                        console.error("Firestore connection failed:", firestoreError);
                        // Fallback will trigger if userData is null
                    }

                    // 2. Fallback: Hardcoded User (Development Mode if DB is missing)
                    if (!userData && email === 'admin@reziko.com' && password === 'admin123') {
                        console.log("Using FALLBACK Hardcoded Admin Credentials");
                        return {
                            id: 'admin',
                            email: 'admin@reziko.com',
                            name: 'Admin User (Offline Mode)'
                        };
                    }

                    if (!userData) return null;

                    const passwordsMatch = await compare(password, userData.password);
                    if (passwordsMatch) {
                        return {
                            id: email,
                            email: userData.email,
                            name: "Admin"
                        };
                    }
                } catch (e) {
                    console.error("Auth Error:", e);
                }

                return null;
            },
        }),
    ],
});
