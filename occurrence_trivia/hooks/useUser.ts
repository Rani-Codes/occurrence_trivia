import { useState, useEffect } from "react";
import { auth } from "@/firebase/config"; // Import Firebase Auth
import { onAuthStateChanged, User } from "firebase/auth";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return { user };
};
