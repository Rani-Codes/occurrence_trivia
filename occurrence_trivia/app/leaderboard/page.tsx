"use client";
import { useState, useEffect } from "react";
import Leaderboard from "@/components/leaderboard";
import { getCurrentDateString } from "@/utils/dateUtils";

const Page = () => {
  const [dayChosen, setDayChosen] = useState(getCurrentDateString());

  useEffect(() => {
    // Function to update dayChosen at midnight
    const updateDayAtMidnight = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // Set to next midnight

      const msUntilMidnight = midnight.getTime() - now.getTime();

      const timeoutId = setTimeout(() => {
        setDayChosen(getCurrentDateString()); // Update state when new day starts
        updateDayAtMidnight(); // Schedule next update
      }, msUntilMidnight);

      return timeoutId;
    };

    const timeoutId = updateDayAtMidnight(); // Start the process

    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, []);

  return (
    <div>
      <Leaderboard dayChosen={dayChosen} />
    </div>
  );
};

export default Page;
