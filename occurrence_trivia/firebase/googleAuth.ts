import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./config";
import { FirebaseError } from "firebase/app";

// Define the provider
const provider = new GoogleAuthProvider();

// Asynchronous function to handle sign-in
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    
    // Google Access Token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    
    // Signed-in user info
    const user = result.user;

    // Return user information
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

    // You can return undefined or throw an error to be caught by the caller
    return undefined;
  }
};

// Function to sign out
export const signOutFromGoogle = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
