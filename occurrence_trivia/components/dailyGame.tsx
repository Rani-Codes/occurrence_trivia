'use client'
import { useDailyChallenge } from "@/hooks/useDailyChallenge";
import DailyInfo from "./dailyInfo";
import SlideShow from "./slideshow";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { getCurrentDateString } from "@/utils/dateUtils";
import { useAuth } from "@/hooks/useAuth";

const DailyGame = () => {
    const { handleSignIn } = useAuth()

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
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-center text-2xl">Please <span className="font-semibold">sign in with Google</span> to play the game.</h1>
                    <button
                        onClick={handleSignIn}
                        className="bg-blackOlive text-floralWhite text-xl py-2 px-4 my-6 rounded-lg hover:bg-eerieBlack hover:shadow-[0_0_15px_5px_#808080] transition-shadow duration-300"
                        >
                        Sign in with google
                    </button>
                </div>
            )}
        </>
    )
}

export default DailyGame
