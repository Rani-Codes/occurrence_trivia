'use client'
import { db } from "@/firebase/config"
import { doc, getDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import Card from "@/components/card";
import CostumSlider from "@/components/slider"
import DateChosen from "@/components/dateChosen"

interface DailyChallengeData {
  image: [string, number, number, boolean];
  timePeriod: [number, number];
  releaseTime: Timestamp;
}

const SlideShow = () => {
  const [daily, setDaily] = useState<DailyChallengeData | null>(null);
  const [error, setError] = useState<string | null>(null)
  const [month, setMonth] = useState<number>(1)
  const [year, setYear] = useState<number>(2000)

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth)
  }

  const handleYearChange = (newYear: number) => {
    setYear(newYear)
  }

  const getDocument = async (docId: string) => {
    try {
      const docRef = doc(db, "dailyChallenges", docId);
      const docSnap = await getDoc(docRef);
      
      if(docSnap.exists()) {
        const data = docSnap.data() as DailyChallengeData;
        setDaily(data);
      } else {
        setError("No such document!");
      }
    }
   catch (error) {
    console.error('Error fetching document:', error);
    setError("Error fetching document");
    }
  };
  
  
  useEffect(() => {
    getDocument("09-01-2024"); // Replace with desired document ID
  }, [])


  return (
    <div className="flex flex-col justify-center items-center w-full text-eerieBlack">
        {error ? (
        <p className="text-red-600">{error}</p>
        ) : daily ? (
        <>
            <h2 className="font-semibold text-2xl">Daily Challenge</h2>
            <Card daily={daily} /> 
            <p>This image was taken on {daily.image[1]}, {daily.image[2]}.</p>
            <p> Is it a real image? {daily.image[3] ? 'Yes' : 'No'}</p>

            <CostumSlider lowerBound={1} upperBound={12} lowerName="January" upperName="December" onValueChange={handleMonthChange}/>
            <CostumSlider lowerBound={daily.timePeriod[0]} upperBound={daily.timePeriod[1]} lowerName={daily.timePeriod[0]} upperName={daily.timePeriod[1]} onValueChange={handleYearChange}/>
            <DateChosen month={month} year={year}/>
            
            <div className="my-20 text-center">
                <h2 className="text-lg">About today's images</h2>
                <p>The release time for these images is: {daily.releaseTime.toDate().toLocaleDateString()} </p>
                <p>The images for today are from the time period between: {daily.timePeriod[0]} - {daily.timePeriod[1]} </p>
                <p>It is your job to select the correct month and year for each image or select fake if you believe the image isn't real</p>
            </div>
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