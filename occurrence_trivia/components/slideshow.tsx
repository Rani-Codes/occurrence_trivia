'use client'
import { useState } from "react";
import { useDailyChallenge } from "@/hooks/useDailyChallenge";
import Card from "@/components/card";
import CostumSlider from "@/components/slider"
import DateChosen from "@/components/dateChosen"
import DailyInfo from "./dailyInfo";


const SlideShow = () => {
  const [month, setMonth] = useState<number>(1)
  const [year, setYear] = useState<number>(2000)
  
  //custom hook to fetch firebase dailyChallenge data
  const { daily, error } = useDailyChallenge('09-08-2024') //replace string with desired date

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth)
  }

  const handleYearChange = (newYear: number) => {
    setYear(newYear)
  }

  return (
    <div className="flex flex-col justify-center items-center w-full text-eerieBlack">
        {error ? (
        <p className="text-red-600">{error}</p>
        ) : daily ? (
        <>
            <h2 className="font-semibold text-2xl">Daily Challenge #1</h2>

            {daily.images.map((image, index) => (
              <div key={index} className="w-full">
                <Card image={image} /> 
                <div className="w-full flex flex-col justify-center items-center">
                  <CostumSlider lowerBound={1} upperBound={12} lowerName="January" upperName="December" onValueChange={handleMonthChange}/>
                  <CostumSlider lowerBound={daily.timePeriod[0]} upperBound={daily.timePeriod[1]} lowerName={daily.timePeriod[0]} upperName={daily.timePeriod[1]} onValueChange={handleYearChange}/>
                  <DateChosen month={month} year={year}/>
                </div>
              </div>
            ))}
            <DailyInfo/>
        </>
        ) : (
        <div className="flex flex-col justify-center items-center w-full text-eerieBlack my-10"> 
            <h3 className="text-xl">Loading...</h3>
        </div>
        )}
    </div>
  )
}

export default SlideShow