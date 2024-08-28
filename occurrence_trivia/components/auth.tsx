'use client'
import { useEffect, useState } from "react";
import { signInWithGoogle, signOutFromGoogle } from "@/firebase/googleAuth";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import Image from 'next/image'

const Auth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is signed in, update state
      } else {
        setUser(null); // User is signed out, clear state
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


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
          {user.photoURL && (
            <Image
              src={user.photoURL}
              width={50}
              height={50}
              alt={`${user.displayName}'s profile picture`}
            />
          )
          }
          <button onClick={handleSignOut} className="p-4">Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
};

export default Auth;
