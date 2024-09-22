import { Guess } from "./slideshow"
import { DailyChallengeData } from "@/hooks/useDailyChallenge"


interface ScoreProps {
    guess: Guess // User's guess for an image
    index: number // Index of the current image
    daily: DailyChallengeData // Daily data containing the correct answers
    maxScore: number // Pass the maximum score dynamically
  }
  
  const Score: React.FC<ScoreProps> = ({ guess, index, daily, maxScore }) => {
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
        points = maxScore - totalMonthsDiff; // Only deduct points based on time difference if the guess is correct
      } else {
        points = 0; // Incorrect guess gets 0 points
      }
    } else {
      // If the image is fake
      points = wasRealGuessCorrect ? maxScore : 0; // Full points for correct fake guess, 0 for incorrect
    }

    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
  ];

  const scoreEmojis = ['💀', '🙂‍↕️', '😤'];

  
    return (
<div className={`mt-2 ${index % 2 === 0 ? 'bg-blackOlive' : 'bg-eerieBlack'} text-floralWhite p-4 rounded flex flex-col justify-center items-center`}>
        <h1 className="text-center text-base sm:text-lg pb-2">
          You <span className="font-bold">{wasRealGuessCorrect ? <span className="text-green-500">correctly</span> : <span className="text-red-500">incorrectly</span>}</span> guessed
           image {index + 1} was{" "}
          {guess.real ? "real" : "fake"}
        </h1>
        <div className="flex flex-col justify-center items-center sm:flex-row w-full sm:justify-between">
          <img src={daily.images[index].url} alt={`Image ${index + 1}`} className="w-20 h-20 object-cover rounded mb-2 sm:mb-4" />

          <div className="text-center mb-2 sm:mb-4 text-sm sm:text-base">
            <h3 className="underline">Your Guess</h3>
            <h5>Type:  <span className="font-semibold">{guess.real ? 'Real' : 'Fake'}</span></h5>
            {guess.real ? (
              <h5>Date: {monthNames[guess.month -1]} {guess.year}</h5>
          ) : (
              <></>
            )}
          </div>

          <div className="text-center mb-2 sm:mb-4 text-sm sm:text-base">
            <h3 className="underline">Correct Answer</h3>
            <h5>Type:  <span className="font-semibold">{correctReal ? 'Real' : 'Fake'}</span></h5>
            {correctReal ? (
              <h5>Date: {monthNames[correctMonth -1]} {correctYear}</h5>
            ) : (
              <></>
            )}
          </div>

        </div>
        <h1 className="text-center text-base sm:text-lg pt-2 sm:pt-0">You earned <span className="font-semibold bg-flame p-1 rounded">{points}</span> points on this image {' '}
        {points >= (maxScore * 3 / 4) ? scoreEmojis[2] : points >= (maxScore * 1 / 2) ? scoreEmojis[1] : scoreEmojis[0]}
        </h1>
      </div>
    )
  }
  
  export default Score
  