import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './config';


export const createDailyChallengeDocument = async (docId: string) => {
    const dailyChallengeRef = doc(db, "dailyChallenges", docId);

    // Boilerplate data for the daily challenge
    const dailyChallengeData = {
        maxScore: 1200,
        releaseTime: Timestamp.fromDate(new Date()), // Firestore Timestamp
        timePeriod: [1900, 2000], // Time period for images
        topic: "Unknown", // Set the topic
        hint: "no hint for this challenge" //provide a hint if you want
    };

    const images = [
        {
            month: 4,
            real: true,
            url: "https://picsum.photos/200",
            year: 1925,
        },
        {
            month: 4,
            real: true,
            url: "https://picsum.photos/200",
            year: 1925,
        },
        {
            month: 4,
            real: true,
            url: "https://picsum.photos/200",
            year: 1925,
        },
        {
            month: 4,
            real: true,
            url: "https://picsum.photos/200",
            year: 1925,
        },
        {
            month: 4,
            real: true,
            url: "https://picsum.photos/200",
            year: 1925,
        }
    ];

    try {
        // Set the main daily challenge document
        await setDoc(dailyChallengeRef, dailyChallengeData);

        // Set the subcollection 'images'
        images.forEach(async (image, index) => {
            const imageRef = doc(dailyChallengeRef, "images", `${index + 1}`);
            await setDoc(imageRef, image);
        });

        console.log("Daily challenge document created successfully!");
    } catch (error) {
        console.error("Error creating daily challenge document: ", error);
    }
};
