'use client'
import { useState } from "react";
import Card from "@/components/card";
import Score from "./score";
import GuessForm from "./guessForm";
import { DailyChallengeData } from "@/hooks/useDailyChallenge";

export interface Guess {
  month: number
  year: number
  real: boolean
}

const SlideShow = ({daily}: {daily: DailyChallengeData}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [isComplete, setIsComplete] = useState<boolean>(false)

  const [month, setMonth] = useState<number>(1)
  const [year, setYear] = useState<number>(2000)
  const [isFake, setIsFake] = useState<boolean>(false)

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
    <>
      {daily.images[currentIndex] && !isComplete && (
        <div className="w-full">
          <Card image={daily.images[currentIndex]} /> 
          <GuessForm
            month={month}
            year={year}
            daily={daily}
            handleMonthChange={handleMonthChange}
            handleYearChange={handleYearChange}
            handleFakeToggle={handleFakeToggle}
            handleFormSubmit={handleFormSubmit}
          />
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
    </>
  )
}

export default SlideShow