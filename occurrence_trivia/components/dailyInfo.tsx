import { useDailyChallenge } from "@/hooks/useDailyChallenge"

interface DailyInfoProps {
    dayChosen: string
}

const DailyInfo = ({ dayChosen }: DailyInfoProps) => {
    const { daily } = useDailyChallenge(dayChosen)
    return (
        <>
        {daily ? (
            <div className="my-10 text-center">

                {daily.topic ? (
                <h3>The topic for today is <span className="bg-yellow-300 p-1 rounded-lg font-semibold">{daily.topic}</span></h3>
                ) : (
                <h3>The topic for today has not been specified.</h3>
                )}

                {daily.hint && (
                    <p className="text-blue-600 font-semibold">Hint: {daily.hint}</p>
                )}

                <p>These images are the daily challenge for {daily.releaseTime.toDate().toLocaleDateString()} </p>
                <p>The images for today are from the time period between: {daily.timePeriod[0]} - {daily.timePeriod[1]} </p>
                <p>Select a month and year for each image or select fake if you believe the image doesn't belong in this category based on the topic and hint</p>
            </div>
        ) : (
            <div className="my-20 w-1/2 text-center">
                <h2 className="flex justify-center items-center text-lg">The daily info for the daily challenge could not be displayed because this component is 
                using a day that doesn't exist in the database. </h2>
            </div>
        )}
        </>
    )
}

export default DailyInfo