import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import { doc, getDoc, collection, getDocs, Timestamp } from "firebase/firestore"; 

export interface DailyChallengeData {
    images: ImageData[]
    timePeriod: [number, number]
    releaseTime: Timestamp
    topic: string
    maxScore: number
    hint: string
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

    useEffect (() => {
      const getDocument = async () => {
        try {
          if (!docId) return;  // Don't attempt to fetch if docId isn't set yet

          console.log("Fetching daily challenge for:", docId);  // For debugging

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

      getDocument()
    }, [docId]);  // Re-run when docId (dayChosen) changes

    return {daily, error}
}