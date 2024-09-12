import { useDailyChallenge } from "@/hooks/useDailyChallenge"

const DailyInfo = () => {
    const {daily} = useDailyChallenge('09-08-2024')
    return (
        <>
        {daily ? (
            <div className="my-20 text-center">
                <h2 className="text-lg">About today's images</h2>
                <p>The release time for these images is: {daily.releaseTime.toDate().toLocaleDateString()} </p>
                <p>The images for today are from the time period between: {daily.timePeriod[0]} - {daily.timePeriod[1]} </p>
                <p>It is your job to select the correct month and year for each image or select fake if you believe the image isn't real</p>
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