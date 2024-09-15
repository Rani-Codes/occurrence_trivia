import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle, signOutFromGoogle } from "@/firebase/googleAuth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createUserDocument } from "@/firebase/createUserDoc";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const db = getFirestore();

    // Listen to auth state changes
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setIsLoading(true);

                // Ensure the user document is created first, if not already present
                await createUserDocument(currentUser);

                // Check if the user has a username
                const userRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists() && userDoc.data()?.username) {
                    // User has a username
                    console.log("User has a username:", userDoc.data().username);
                } else {
                    // User does not have a username, redirect them
                    router.push('/set-username'); // Redirect to "Set Username" page
                }

                setUser(currentUser);
                setIsLoading(false);
            } else {
                setUser(null);
                setIsLoading(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [router, db]);

    const handleSignIn = async () => {
        setIsLoading(true);
        const result = await signInWithGoogle();
        if (result) {
            setUser(result.user); // Assign the user to state if successful
        } else {
            console.error("Sign-in failed");
        }
        setIsLoading(false);
    };

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await signOutFromGoogle();
            setUser(null);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    return { user, isLoading, handleSignIn, handleSignOut };
};
