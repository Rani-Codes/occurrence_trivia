'use client'
import { db } from "@/firebase/config"
import { doc, getDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import Card from "@/components/card";
import CostumSlider from "@/components/slider"

interface DailyChallengeData {
  image: [string, number, number, boolean];
  timePeriod: [number, number];
  releaseTime: Timestamp;
}

const SlideShow = () => {
  const [daily, setDaily] = useState<DailyChallengeData | null>(null);
  const [error, setError] = useState<string | null>(null)

  const getDocument = async (docId: string) => {
    try {
      const docRef = doc(db, "dailyChallenges", docId);
      const docSnap = await getDoc(docRef);
      
      if(docSnap.exists()) {
        const data = docSnap.data() as DailyChallengeData;
        setDaily(data);
        console.log('Daily Challenge Data:', data, data.timePeriod);
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

            <CostumSlider lowerBound={1} upperBound={12} lowerName="January" upperName="December"/>
            <CostumSlider lowerBound={daily.timePeriod[0]} upperBound={daily.timePeriod[1]} lowerName={daily.timePeriod[0]} upperName={daily.timePeriod[1]}/>
            
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
    
    // <div className="w-full flex justify-center">
    //     <div className="flex justify-center w-4/12 h-96 rounded-lg bg-blackOlive">
    //     {error ? (
    //       <p className="text-red-600">{error}</p>
        
    //   ) : daily ? (
    //     <div className="flex flex-col justify-center items-center text-floralWhite">

    //       {/* Display image */}
    //       <img
    //         src={daily.image[0]}
    //         alt="Challenge image"
    //         className="mb-4 rounded-lg w-1/2 h-auto"
    //       />
    //       <p>This image was taken in month {daily.image[1]}, {daily.image[2]} year.</p>
    //       <p> Is it a real image? {daily.image[3] ? 'Yes' : 'No'}</p>

    //       {/* Display releaseTime */}
    //       <p>
    //         Release Time: {daily.releaseTime.toDate().toLocaleDateString()}
    //       </p>

    //       {/* Display timePeriod */}
    //       <p>
    //         Time Period: {daily.timePeriod[0]} - {daily.timePeriod[1]}
    //       </p>
    //     </div>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    //     </div>
    // </div>
  )
}

export default SlideShow