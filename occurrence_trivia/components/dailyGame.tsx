'use client'
import { useDailyChallenge } from "@/hooks/useDailyChallenge";
import DailyInfo from "./dailyInfo";
import SlideShow from "./slideshow";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { getCurrentDateString } from "@/utils/dateUtils";

const DailyGame = () => {
    const [dayChosen, setDayChosen] = useState<string>(""); // Use state to store the chosen day
    const [isHintOpen, setIsHintOpen] = useState<boolean>(true); // Control for the AlertDialog

    // Set the current date as dayChosen when the component mounts
    useEffect(() => {
        const currentDate = getCurrentDateString();
        setDayChosen(currentDate);
        console.log("Setting dayChosen to:", currentDate);  // For debugging
    }, []);

    const { daily, error } = useDailyChallenge(dayChosen)
    const { user } = useUser()

    // Automatically open the hint dialog when the user is signed in and daily challenge data is loaded
    useEffect(() => {
        if (user && daily) {
            setIsHintOpen(true); // Open the AlertDialog
        }
    }, [user, daily]);

    if (error) {
        return <p className="text-red-600 text-lg flex justify-center">{error}</p>;
    }

    return (
        <>
            {user && (
                <div className="flex flex-col justify-center items-center w-full text-eerieBlack">
                    {daily ? (
                        <>
                            <h2 className="font-semibold text-2xl">Daily Challenge {dayChosen}</h2>
                            <DailyInfo dayChosen={dayChosen} isHintOpen={isHintOpen} setIsHintOpen={setIsHintOpen} />
                            <SlideShow userId={user.uid} daily={daily} dayChosen={dayChosen} />
                        </>
                    ) : (
                        <div className="flex flex-col justify-center items-center w-full text-eerieBlack my-10">
                            <h3 className="text-xl">Loading...</h3>
                        </div>
                    )}
                </div>
            )}
            {!user && (
                <h2 className="text-center text-xl">Please login to play the game.</h2>
            )}
        </>
    )
}

export default DailyGame
