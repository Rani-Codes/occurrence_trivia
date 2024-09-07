import { Timestamp } from "firebase/firestore";

interface DailyChallengeData {
  image: [string, number, number, boolean];
  timePeriod: [number, number];
  releaseTime: Timestamp;
}

const Card = ({ daily }: {daily: DailyChallengeData} ) => {
  return (
    <div className="w-full flex justify-center">
        <div className="flex justify-center w-4/12 h-96 rounded-lg bg-blackOlive p-4">
        {daily ? (
        <div className="flex flex-col justify-center h-auto items-center text-floralWhite">
          {/* Display image */}
          <img
            src={daily.image[0]}
            alt="Challenge image"
            className="rounded-lg w-full h-full"
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
        </div>
    </div>
  )
}

export default Card