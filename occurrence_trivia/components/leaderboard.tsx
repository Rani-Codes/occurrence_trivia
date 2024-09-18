'use client'
import { useEffect, useState } from "react";
import { db } from "@/firebase/config"; // Import your Firestore setup
import { collection, getDocs } from "firebase/firestore";

interface LeaderboardEntry {
  username: string;
  profilePicture: string;
  score: number;
}

const Leaderboard = ({ dayChosen }: { dayChosen: string }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const fetchLeaderboard = async () => {
    const usersCollectionRef = collection(db, "users");

    // Get all users in the collection
    const userDocs = await getDocs(usersCollectionRef);

    const scores: LeaderboardEntry[] = [];

    userDocs.forEach((doc) => {
      const userData = doc.data();

      // Check if the user has a score for the selected day
      if (userData.dailyScores && userData.dailyScores[dayChosen]) {
        scores.push({
          username: userData.username || "Unknown User",
          profilePicture: userData.profilePicture || "",
          score: userData.dailyScores[dayChosen],
        });
      }
    });

    // Sort by score in descending order and take the top 10
    const topScores = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setLeaderboard(topScores);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [dayChosen]);

  const place = ['1st 🥇', '2nd 🥈', '3rd 🥉', '4th', '5th', '6th', '7th', '8th', '9th', '10th']

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-8 mb-4">Leaderboard for {dayChosen}</h2>
      <div className="flex flex-col justify-center items-center w-full">
        <ul className="w-8/12">

            <div className="flex items-center justify-between px-2 text-xl underline">
                <span className="font-semibold">Rank</span>
                <span className="font-semibold">User</span>
                <span className="font-bold">Score</span>
            </div>

            {leaderboard.map((entry, index) => (
            <li key={index} className="flex items-center justify-between p-2 bg-timberwolf text-eerieBlack rounded-lg my-2">
                <span className="font-bold text-2xl">{place[index]}</span>
                <div className="flex items-center">
                <img src={entry.profilePicture} alt={`${entry.username}'s profile`} className="w-12 h-12 rounded-full mr-4" />
                <span className="font-semibold text-xl">{entry.username}</span>
                </div>
                <span className="font-bold text-xl">{entry.score}</span>
            </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
