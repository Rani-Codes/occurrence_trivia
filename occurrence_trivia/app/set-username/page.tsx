'use client'
import { useEffect, useState } from "react";
import { getFirestore, doc, setDoc, collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const SetUsername = () => {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const db = getFirestore();
  const router = useRouter();

  useEffect(() => {
    const checkUsername = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data()?.username) {
          // User already has a username, redirect to home
          router.push('/');
        }
      }
    };

    checkUsername();
  }, [user, db, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (username.trim() === "") {
      setError("Username cannot be empty");
      return;
    }
  
    try {
      // Check if the username is already taken
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        setError("Username is already taken, please choose another one");
        return;
      }
  
      // Username is unique, update Firestore
      const userRef = doc(db, "users", user!.uid);
      await setDoc(userRef, { username }, { merge: true });
  
      router.push('/'); // Redirect to home after setting the username
    } catch (err) {
      console.error("Error setting username:", err);
      setError("An error occurred while setting the username");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center p-4 my-10">
      <h1 className="text-base text-center pb-2 sm:text-xl">Hi there! It looks like you don't have a username yet, please enter a username you would like to have. </h1>
      <h4 className="underline text-sm sm:text-base text-center ">Note: This username will be visible to all players if you make it on to the leaderboard.</h4>
      <h2 className="mt-10">Set a <em>unique</em> username</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="mb-4 p-2 border"
        />
        <button type="submit" className="bg-flame text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
};

export default SetUsername;
