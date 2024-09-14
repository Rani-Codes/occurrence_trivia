import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore'
import { getAuth, User } from 'firebase/auth'

const db = getFirestore()
const auth = getAuth()


const createUserDocument = async (user: User) => {
    const userRef = doc(db, "users", user.uid)

    const userData = {
        username: '', // Will be set later by the user
        timeCompletedDaily: [], // Array of timestamps
        dailyScores: [], // Array of scores (numbers)
        profilePicture: user.photoURL, // Taken from Google login
    }

    // Create the user document in Firestore
    await setDoc(userRef, userData, { merge: true });
}

auth.onAuthStateChanged(async (user) => {
    if (user) {
        // Create the document when the user logs in
        await createUserDocument(user);
    }
})