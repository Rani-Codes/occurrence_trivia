import { db } from './admin';
import { Timestamp } from 'firebase-admin/firestore';

interface ImageData {
  imageUrl: string;
  month: number;
  year: number;
  isReal: boolean;
}

interface DailyChallengeData {
  images: ImageData[];
  timePeriod: {
    lowerBound: number;
    upperBound: number;
  };
  releaseTime: Timestamp;
}

// Function to add a new daily challenge
const addDailyChallenge = async (date: string, data: DailyChallengeData) => {
  try {
    const challengeRef = db.collection('dailyChallenges').doc(date);
    await challengeRef.set(data);
    console.log(`Daily challenge for ${date} added successfully.`);
  } catch (error) {
    console.error("Error adding daily challenge:", error);
  }
};

// Example usage:
const dailyChallengeData: DailyChallengeData = {
  images: [
    { imageUrl: 'https://example.com/image1.jpg', month: 5, year: 1987, isReal: true },
    { imageUrl: 'https://example.com/image2.jpg', month: 8, year: 1995, isReal: false },
    // Add 3 more images
  ],
  timePeriod: {
    lowerBound: 1920,
    upperBound: 2020
  },
  releaseTime: Timestamp.fromDate(new Date('2024-09-01T00:00:00Z')) // Adjust the release time as needed
};

// Add the challenge for a specific date
addDailyChallenge('2024-09-01', dailyChallengeData);
