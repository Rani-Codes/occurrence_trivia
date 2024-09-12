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
  
    const yearDiff = Math.abs(guess.year - correctYear)
    const monthDiff = Math.abs(guess.month - correctMonth)
  
    const totalMonthsDiff = yearDiff * 12 + monthDiff

    const points = 1200 - totalMonthsDiff
  
    return (
      <div className="mt-2">
        <p>For image {index + 1} you chose: month {` ${guess.month} and year ${guess.year}`}</p>
        <p>
          You were {yearDiff} years and {monthDiff} months away from the correct date.
        </p>
        <p>You got {points} points for image {index + 1}.</p>
      </div>
    )
  }
  
  export default Score
  