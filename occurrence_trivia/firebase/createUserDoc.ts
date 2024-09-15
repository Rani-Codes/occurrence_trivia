import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

const db = getFirestore();

export const createUserDocument = async (user: User) => {
    if (!user?.uid) {
        console.error("User UID is undefined");
        return;
    }

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const userData = {
            username: '', // Set later
            timeCompletedDaily: [], // Array of timestamps
            dailyScores: [], // Array of scores (numbers)
            profilePicture: user.photoURL, // Taken from Google login
        };
        await setDoc(userRef, userData);
    }
};
