'use client'
import { useDailyChallenge } from "@/hooks/useDailyChallenge";
import DailyInfo from "./dailyInfo";
import SlideShow from "./slideshow";

const DailyGame = () => {
    const { daily, error } = useDailyChallenge('09-08-2024') //replace string with desired date

    if(error) {
        return <p className="text-red-600 text-lg flex justify-center">{error}</p>
    }

    return (
        <div className="flex flex-col justify-center items-center w-full text-eerieBlack">
            {daily ? (
            <>
                <h2 className="font-semibold text-2xl">Daily Challenge #1</h2>
                <SlideShow daily={daily} />
                <DailyInfo />
            </>
            ): (
            <div className="flex flex-col justify-center items-center w-full text-eerieBlack my-10"> 
                <h3 className="text-xl">Loading...</h3>
            </div>
            )}
        </div>
    )
}

export default DailyGame