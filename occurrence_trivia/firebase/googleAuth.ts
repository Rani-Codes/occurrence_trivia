import { signInWithPopup, signInWithRedirect, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./config";
import { FirebaseError } from "firebase/app";

// Define the provider
const provider = new GoogleAuthProvider();

// Asynchronous function to handle sign-in
export const signInWithGoogle = async () => {
  try {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent); // Check for mobile devices
    console.log("Device type detected:", isMobile ? "Mobile" : "Desktop");

    let result;

    if (isMobile) {
      console.log("Attempting sign-in with redirect...");
      result = await signInWithRedirect(auth, provider);
    } else {
      console.log("Attempting sign-in with popup...");
      result = await signInWithPopup(auth, provider);
    }

    console.log("Sign-in result:", result);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    console.log("User signed in:", user);
    return { user, token };

  } catch (error) {
    console.error("Error during Google sign-in:", error);
    // ... (rest of the error handling)
    return undefined;
  }
};


// Function to sign out
export const signOutFromGoogle = async () => {
  signOut(auth).then(() => {
    console.log('signed out successfully');
  }).catch((error) => {
    console.error("Error signing out:", error);
  });
};
