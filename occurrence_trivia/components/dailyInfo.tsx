import { useDailyChallenge } from "@/hooks/useDailyChallenge"

interface DailyInfoProps {
    dayChosen: string
}

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

const DailyInfo = ({ dayChosen }: DailyInfoProps) => {
    const { daily } = useDailyChallenge(dayChosen)
    return (
        <>
                    <AlertDialog>
                        <AlertDialogTrigger className="bg-eerieBlack my-2 p-2 rounded-2xl text-floralWhite">Hint</AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle className="text-center font-bold w-full bg-blackOlive text-floralWhite p-2">Daily Challenge {dayChosen}</AlertDialogTitle>
                            <AlertDialogDescription>
                            
                            {daily ? (

                            <div className="text-center text-eerieBlack flex flex-col gap-2">
                                {daily.topic ? (
                                    <h3>The topic for today is <span className="bg-yellow-300 p-1 rounded-lg font-semibold">{daily.topic}</span></h3>
                                    ) : (
                                    <h3>The topic for today has not been specified.</h3>
                                )}

                                {daily.hint && (
                                    <p className="text-blue-600 font-semibold">Hint: {daily.hint}</p>
                                )}

                                <p>Time period for today's images: <span className="font-semibold"> {daily.timePeriod[0]} - {daily.timePeriod[1]} </span></p>
                                <p>Choose a month and year for each image or select fake if you believe the image doesn't belong in this category.</p>
                            </div>

                            ) : (
                            <div className="text-center text-eerieBlack">
                                <h2 className="">The daily info for the daily challenge could not be displayed because this component is 
                                using a day that doesn't exist in the database. </h2>
                            </div>
                            )}

                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <div className="flex justify-center w-full">
                                    <AlertDialogCancel>Close</AlertDialogCancel>
                                </div>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
        </>
    )
}

export default DailyInfo