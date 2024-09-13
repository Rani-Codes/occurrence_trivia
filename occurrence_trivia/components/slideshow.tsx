'use client'
import { useState } from "react";
import { useDailyChallenge } from "@/hooks/useDailyChallenge";
import Card from "@/components/card";
import CostumSlider from "@/components/slider"
import DateChosen from "@/components/dateChosen"
import DailyInfo from "./dailyInfo";
import Score from "./score";

export interface Guess {
  month: number
  year: number
  real: boolean
}

const SlideShow = () => {
  const { daily, error } = useDailyChallenge('09-08-2024') //replace string with desired date

  const [month, setMonth] = useState<number>(1)
  const [year, setYear] = useState<number>(2000)
  const [isFake, setIsFake] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [isComplete, setIsComplete] = useState<boolean>(false)

  const handleMonthChange = (newMonth: number) => setMonth(newMonth)
  const handleYearChange = (newYear: number) => setYear(newYear)

  const handleFakeToggle = (value: boolean) => setIsFake(value)

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    const newGuess: Guess = { month, year, real: !isFake };
    setGuesses((prevGuesses) => [...prevGuesses, newGuess])
  
    if (daily && currentIndex >= daily.images.length - 1) {
      console.log("End of slideshow. All guesses saved!", [...guesses, newGuess]);
      setIsComplete(true)
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1)
      setMonth(1);
      setYear(daily!.timePeriod[0]);
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center w-full text-eerieBlack">
        {error ? (
        <p className="text-red-600">{error}</p>
        ) : daily ? (
        <>
            <h2 className="font-semibold text-2xl">Daily Challenge #1</h2>

            {daily.topic ? (
              <h3 className="mb-2">The topic for today is <span className="bg-yellow-300 p-1 rounded-lg font-semibold">{daily.topic}</span></h3>
            ) : (
              <h3 className="mb-2">The topic for today has not been specified.</h3>
            )}

            {daily.images[currentIndex] && !isComplete && (
              <div className="w-full">
                <Card image={daily.images[currentIndex]} /> 

                <form onSubmit={handleFormSubmit} className="w-full flex flex-col justify-center items-center">
                    <CostumSlider lowerBound={1} upperBound={12} lowerName="January" upperName="December" onValueChange={handleMonthChange}/>
                    <CostumSlider lowerBound={daily.timePeriod[0]} upperBound={daily.timePeriod[1]} lowerName={daily.timePeriod[0]} upperName={daily.timePeriod[1]} onValueChange={handleYearChange}/>
                    <DateChosen month={month} year={year} onFakeToggle={handleFakeToggle}/>

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4 ">
                      Submit Guess
                    </button>
                </form>

              </div>
            )}
            
            {isComplete && (
              <>
                <p className="mt-4">You have finished the slideshow! All your guesses have been saved.</p>
                <div>
                  <ul>
                    {guesses.map((guess, index) => (
                      <li key={index} className="mt-2">
                        <Score guess={guess} index={index} daily={daily}/>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

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