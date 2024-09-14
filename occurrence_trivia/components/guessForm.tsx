'use client'
import CostumSlider from "@/components/slider"
import DateChosen from "@/components/dateChosen"
import { DailyChallengeData } from "@/hooks/useDailyChallenge"

const GuessForm = ({
    month,
    year,
    daily,
    handleYearChange,
    handleMonthChange,
    handleFakeToggle,
    handleFormSubmit}: {
    month: number,
    year: number,
    daily: DailyChallengeData
    handleMonthChange: (newMonth: number) => void,
    handleYearChange: (newYear: number) => void,
    handleFakeToggle: (value: boolean) => void,
    handleFormSubmit: (event: React.FormEvent) => void
    }) => {
        return (
            <form onSubmit={handleFormSubmit} className="w-full flex flex-col justify-center items-center">
            <CostumSlider 
                lowerBound={1} 
                upperBound={12} 
                lowerName="January" 
                upperName="December" 
                onValueChange={handleMonthChange}
            />
            <CostumSlider 
                lowerBound={daily.timePeriod[0]} 
                upperBound={daily.timePeriod[1]} 
                lowerName={daily.timePeriod[0]} 
                upperName={daily.timePeriod[1]} 
                onValueChange={handleYearChange}
            />
            <DateChosen month={month} year={year} onFakeToggle={handleFakeToggle}/>
    
            <button
                type="submit"
                className="bg-flame text-floralWhite py-2 px-4 rounded-lg mt-4 hover:bg-orange-700 hover:shadow-[0_0_15px_5px_#f0865c] transition-shadow duration-300"
                >
                Submit Guess
            </button>
        
            </form>
        )
}

export default GuessForm