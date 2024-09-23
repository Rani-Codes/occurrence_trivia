import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./config";
import { FirebaseError } from "firebase/app";

// Define the provider
const provider = new GoogleAuthProvider();

// Asynchronous function to handle sign-in
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    return { user, token};

  } catch (error) {
    // Handle Errors
     // Type guard to check if the error is a FirebaseError
     if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);


    console.error("Error during Google sign-in", { errorCode, errorMessage, email, credential });
    } else {
      console.error("Unexpected error during Google sign-in", error);
    }

    return undefined;
  }
};

// Function to sign out
export const signOutFromGoogle = async () => {
  signOut(auth).then(() => {
    console.log('signed out successfully')
    // Sign-out successful.
  }).catch((error) => {
    console.error("Error signing out:", error);
    // An error happened.
  });
};
