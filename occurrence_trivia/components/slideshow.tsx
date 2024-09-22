'use client'
import { useState, useEffect } from "react"
import { db } from "@/firebase/config" // Import your Firestore setup
import { doc, getDoc, updateDoc } from "firebase/firestore" // Firestore methods
import Card from "@/components/card"
import Score from "./score"
import GuessForm from "./guessForm"
import { DailyChallengeData } from "@/hooks/useDailyChallenge"
import Link from "next/link"

export interface Guess {
  month: number
  year: number
  real: boolean
}

const SlideShow = ({ userId, daily, dayChosen }: { userId: string, daily: DailyChallengeData, dayChosen: string }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [totalScore, setTotalScore] = useState<number>(0)
  const [canAttempt, setCanAttempt] = useState<boolean>(false)

  const [month, setMonth] = useState<number>(1)
  const [year, setYear] = useState<number>(2000)
  const [isFake, setIsFake] = useState<boolean>(false)

  // Function to calculate score
  const calculateScore = (guesses: Guess[], daily: DailyChallengeData) => {
    let score = 0

    guesses.forEach((guess, index) => {
      const correctYear = daily.images[index].year
      const correctMonth = daily.images[index].month
      const correctReal = daily.images[index].real

      const yearDiff = Math.abs(guess.year - correctYear)
      const monthDiff = Math.abs(guess.month - correctMonth)
      const totalMonthsDiff = yearDiff * 12 + monthDiff

      const wasRealGuessCorrect = guess.real === correctReal

      let points = 0

      if (correctReal) {
        points = wasRealGuessCorrect ? 1200 - totalMonthsDiff : 0
      } else {
        points = wasRealGuessCorrect ? 1200 : 0
      }

      score += points
    })

    return score
  }

  const handleCompletion = async () => {
    const userDocRef = doc(db, "users", userId);

    const today = new Date()
    const dayString = today.toLocaleDateString("en-US"); // Format as 'MM-DD-YYYY'
    
    // Update Firestore with the new data
    await updateDoc(userDocRef, {
      timeCompletedDaily: new Date(),
      [`dailyScores.${dayChosen}`]: totalScore //updates the daily score for the specific date
    });
  };
  

  // Function to check if the user can attempt today's challenge
  const checkLastAttempt = async () => {
    const userDocRef = doc(db, "users", userId)
    const userDoc = await getDoc(userDocRef)

    if (userDoc.exists()) {
      const lastAttempt = userDoc.data().timeCompletedDaily

      if (lastAttempt) {
        const lastAttemptDate = new Date(lastAttempt.seconds * 1000) // Convert Firestore timestamp to JS Date
        const today = new Date()
        const isSameDay = today.toDateString() === lastAttemptDate.toDateString()

        if (isSameDay) {
          setCanAttempt(false)
        } else {
          setCanAttempt(true)
        }
      } else {
        setCanAttempt(true) // If no last attempt, allow the user to attempt
      }
    }
  }

  useEffect(() => {
    checkLastAttempt()
  }, [userId])

  // Handle form submission
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!canAttempt) {
      return
    }

    const newGuess: Guess = { month, year, real: !isFake }
    setGuesses((prevGuesses) => [...prevGuesses, newGuess])

    if (daily && currentIndex >= daily.images.length - 1) {
      const finalScore = calculateScore([...guesses, newGuess], daily)
      setTotalScore(finalScore)
      setIsComplete(true)
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1)
      setMonth(1)
      setYear(daily!.timePeriod[0])
    }
  }

  useEffect(() => {
    if (isComplete && totalScore > 0) {
      handleCompletion(); // Only call after totalScore is calculated
    }
  }, [isComplete, totalScore]); // Trigger the effect when both `isComplete` and `totalScore` are updated
  

  if (!canAttempt) {
    return (
      <div className="text-center text-base flex flex-col gap-2 sm:text-lg mt-4">
        <h1 className="text-xl sm:text-2xl">That's all folks!</h1>
        <h2>You've completed today's challenge.</h2>
        <h3>Come back tomorrow for a new challenge with a new leaderboard! 🔥</h3>
        <h4>See you there! 👋</h4>
      </div>
    )
  }

  return (
    <>
      {daily.images[currentIndex] && !isComplete && (
        <div className="w-full">
          <Card image={daily.images[currentIndex]} /> 
          <GuessForm
            month={month}
            year={year}
            daily={daily}
            handleMonthChange={(newMonth: number) => setMonth(newMonth)}
            handleYearChange={(newYear: number) => setYear(newYear)}
            handleFakeToggle={(value: boolean) => setIsFake(value)}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      )}

      {isComplete && (
        <>
          <h3 className="mt-4 text-center text-base sm:text-lg">You have finished the slideshow! All your guesses have been saved.</h3>
          <div className="w-10/12 sm:w-8/12">
            <ul>
              {guesses.map((guess, index) => (
                <li key={index} className="mt-2">
                  <Score guess={guess} index={index} daily={daily} maxScore={daily.maxScore} />
                </li>
              ))}
              <h2 className="text-lg sm:text-2xl text-center py-4">You earned <b>{totalScore}</b> out of {daily.images.length * daily.maxScore} possible points</h2>
            </ul>

            <div className="flex flex-col justify-center items-center">
              <h3 className="mt-4 text-center mb-2 sm:mb-0 text-base sm:text-lg">Wanna see if you made it onto the daily leaderboard?</h3>
              <Link href={'/leaderboard'}>
                <button
                    className="bg-blackOlive text-floralWhite py-2 px-4 rounded-lg hover:bg-eerieBlack hover:shadow-[0_0_15px_5px_#808080] transition-shadow duration-300"
                    >
                    Leaderboard
                </button>
              </Link>
            </div>

          </div>
        </>
      )}
    </>
  )
}

export default SlideShow
