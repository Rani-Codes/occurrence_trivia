import admin from "firebase-admin";
import path from "path";

const serviceAccountPath = process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountPath) {
  throw new Error("Missing the FIREBASE_SERVICE_ACCOUNT_KEY environment variable.");
}

const serviceAccount = require(path.resolve(serviceAccountPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyUser = async (uid: string) => {
    try {
      const user = await admin.auth().getUser(uid);
      console.log("User details:", user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


export { admin, verifyUser };

