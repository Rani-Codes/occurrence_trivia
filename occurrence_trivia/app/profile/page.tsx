'use client'
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser"; // Assuming you have the custom hook here
import { getFirestore, doc, getDoc } from "firebase/firestore";

const ProfilePage = () => {
  const { user } = useUser();
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setProfileData(userSnap.data());
        }
      }
    };

    fetchUserData();
  }, [user]);



  // Placeholder profile for signed-out users
  if (!user) {
    const placeholderProfile = {
      username: "Guest User",
      profilePicture: "https://robohash.org/mail@ashallendesign.co.uk", // Placeholder image URL
      dailyScores: {
        "09-18-2024": 750,
        "09-17-2024": 5325,
        "09-16-2024": 2140,
      }
    };

    return (
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Welcome back, {placeholderProfile.username}</h1>
        <img
          src={placeholderProfile.profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full mt-4"
        />

        <div className="mt-6 w-8/12">
          <h2 className="text-2xl font-semibold">Your Daily Challenge Scores</h2>
          <ul className="mt-4 space-y-2">
            {Object.entries(placeholderProfile.dailyScores).map(([date, score]) => (
              <li
                key={date}
                className="flex justify-between p-2 bg-blackOlive text-floralWhite rounded-lg shadow text-xl"
              >
                <span>Date: {date}</span>
                <span className="font-semibold">Score: {score}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm italic">
            Sign in to track your real scores and participate in daily challenges!
          </p>
        </div>
      </div>
    );
  }


  // Function to parse and sort dates from latest to earliest
  const sortedScores = profileData?.dailyScores
    ? Object.entries(profileData.dailyScores).sort(([dateA], [dateB]) => {
        const parsedDateA = new Date(dateA);
        const parsedDateB = new Date(dateB);
        return parsedDateB.getTime() - parsedDateA.getTime(); // Sort latest to earliest
      })
    : [];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Welcome back, {profileData?.username}</h1>

      {profileData?.profilePicture && (
        <img
          src={profileData.profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full mt-4"
        />
      )}

      <div className="mt-6 w-8/12">
        <h2 className="text-2xl font-semibold">Your Daily Challenge Scores</h2>
        {sortedScores.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {sortedScores.map(([date, score]) => (
              <li
                key={date}
                className="flex justify-between p-2 bg-blackOlive text-floralWhite rounded-lg shadow text-xl"
              >
                <span>Date: {date}</span>
                <span className="font-semibold">Score: {score as number}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">No scores available yet. Play more games to populate this area.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
