import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import { doc, getDoc, collection, getDocs, Timestamp } from "firebase/firestore"; 

interface DailyChallengeData {
    images: ImageData[]
    timePeriod: [number, number];
    releaseTime: Timestamp;
  }
  
  interface ImageData {
    month: number
    year: number
    real: boolean
    url: string
  }

export const useDailyChallenge = (docId: string) => {

    const [daily, setDaily] = useState<DailyChallengeData | null>(null);
    const [error, setError] = useState<string | null>(null)

    const getDocument = async () => {
        try {
          //Parent data
          const docRef = doc(db, "dailyChallenges", docId);
          const docSnap = await getDoc(docRef);
          
          if(!docSnap.exists()) {
            setError("No such document!");
            return
          }
          const docData = docSnap.data() as Omit<DailyChallengeData, 'images'>;
    
          //Get subcollection 'images'
          const imagesCollectionRef = collection(docRef, "images");
          const imagesSnap = await getDocs(imagesCollectionRef);
    
          const images: ImageData[] = imagesSnap.docs.map(doc => doc.data() as ImageData);
    
    
          // Combine document and subcollection data
          setDaily({
            ...docData,
            images
          });
    
        } catch (error) {
          console.error('Error fetching document:', error);
          setError("Error fetching document");
        }
      };
    
    useEffect (() => {
        getDocument()
    }, [docId])

    return {daily, error}
}