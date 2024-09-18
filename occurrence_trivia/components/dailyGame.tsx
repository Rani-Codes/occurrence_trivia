'use client'
import { useDailyChallenge } from "@/hooks/useDailyChallenge";
import DailyInfo from "./dailyInfo";
import SlideShow from "./slideshow";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { getCurrentDateString } from "@/utils/dateUtils";

const DailyGame = () => {

    const [dayChosen, setDayChosen] = useState<string>(""); // Use state to store the chosen day
    
    // Set the current date as dayChosen when the component mounts
    useEffect(() => {
        const currentDate = getCurrentDateString();
        setDayChosen(currentDate);
    }, []);

    const { daily, error } = useDailyChallenge(dayChosen)
    const { user } = useUser()

    if(error) {
        return <p className="text-red-600 text-lg flex justify-center">{error}</p>
    }

    return (
        <>
        {user && (
            <div className="flex flex-col justify-center items-center w-full text-eerieBlack">
                {daily ? (
                <>
                    <h2 className="font-semibold text-2xl">Daily Challenge #1</h2>
                    <SlideShow userId={user.uid} daily={daily} dayChosen={dayChosen} />
                    <DailyInfo dayChosen={dayChosen}/>
                </>
                ): (
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