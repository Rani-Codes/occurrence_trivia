import { Guess } from "./slideshow"
import { DailyChallengeData } from "@/hooks/useDailyChallenge"


interface ScoreProps {
    guess: Guess // User's guess for an image
    index: number // Index of the current image
    daily: DailyChallengeData // Daily data containing the correct answers
  }
  
  const Score: React.FC<ScoreProps> = ({ guess, index, daily }) => {
    const correctYear = daily.images[index].year
    const correctMonth = daily.images[index].month
    const correctReal = daily.images[index].real
  
    const yearDiff = Math.abs(guess.year - correctYear)
    const monthDiff = Math.abs(guess.month - correctMonth)
    const totalMonthsDiff = yearDiff * 12 + monthDiff

    const wasRealGuessCorrect = guess.real === correctReal

    let points = 0

    if (correctReal) {
      // If the image is real
      if (wasRealGuessCorrect) {
        points = 1200 - totalMonthsDiff; // Only deduct points based on time difference if the guess is correct
      } else {
        points = 0; // Incorrect guess gets 0 points
      }
    } else {
      // If the image is fake
      points = wasRealGuessCorrect ? 1200 : 0; // Full points for correct fake guess, 0 for incorrect
    }

  
    return (
      <div className="mt-2">
        <h1>
          You {wasRealGuessCorrect ? "correctly" : "incorrectly"} guessed that image {index + 1} was{" "}
          {guess.real ? "real" : "fake"}.
        </h1>
        {correctReal ? (
          wasRealGuessCorrect ? (
            <>
              <p>You chose: month {` ${guess.month} and year ${guess.year}`}</p>
              <p>
                You were {yearDiff} years and {monthDiff} months away from the correct date.
              </p>
            </>
          ) : (
            <p>Months away... invalid</p>
          )
        ) : (
          wasRealGuessCorrect ? (
            <>
              <p>Light work no reaction! &#128548;</p>
            </>
          ) : (
            <p>Better luck next time &#128546;</p>
          )
        )}
        <p>You got {points} points for image {index + 1}.</p>
      </div>
    )
  }
  
  export default Score
  