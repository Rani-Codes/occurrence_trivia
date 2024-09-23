import { useEffect, useState } from "react";
import { User, getAuth, getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle, signOutFromGoogle } from "@/firebase/googleAuth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createUserDocument } from "@/firebase/createUserDoc";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const db = getFirestore();
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        console.log("Auth state changed:", currentUser);
        if (currentUser) {
          setIsLoading(true);
          await createUserDocument(currentUser); // Ensure user document is created
  
          // Check if user document exists
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);
          console.log("User document:", userDoc.data());
  
          if (!userDoc.exists() || !userDoc.data()?.username) {
            console.log("Redirecting to set username page...");
            router.push('/set-username');
          }
  
          setUser(currentUser);
        } else {
          console.log("No user signed in");
          setUser(null);
        }
        setIsLoading(false);
      });
  
      // Handle redirect result after a sign-in
      getRedirectResult(auth)
        .then((result) => {
          if (result) {
            console.log("Redirect result:", result);
            setUser(result.user);
          }
        })
        .catch((error) => {
          console.error("Error getting redirect result:", error);
        });
  
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
