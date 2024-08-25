'use client'
import { useState } from "react";
import { signInWithGoogle, signOutFromGoogle } from "@/firebase/googleAuth";
import { User } from "firebase/auth";

const Auth = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result) {
      setUser(result.user); // Assign the user to state if successful
    } else {
      console.error("Sign-in failed");
    }
  };

  const handleSignOut = async () => {
    await signOutFromGoogle();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
};

export default Auth;
