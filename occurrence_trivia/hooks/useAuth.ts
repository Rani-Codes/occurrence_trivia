/**
 * A custom hook that contains reoccuring auth functions to handle signing in with google using firebase
 */

'use client'
import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle, signOutFromGoogle } from "@/firebase/googleAuth";

export const useAuth = () => {

    const [user, setUser] = useState<User | null>(null);

    //Checks to see if user is signed in and if they are then adds them to the useState
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, [user]);
  
      const handleSignIn = async () => {
          const result = await signInWithGoogle();
          if (result) {
            setUser(result.user); // Assign the user to state if successful
          } else {
            console.error("Sign-in failed");
          }
        };
  
      const handleSignOut = async () => {
          try {
              await signOutFromGoogle();
              setUser(null);
          } catch (error) {
              console.log(error);
          }
      }


      return { user, handleSignIn, handleSignOut };
}