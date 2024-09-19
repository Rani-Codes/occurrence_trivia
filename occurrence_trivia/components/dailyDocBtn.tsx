'use client'
import { createDailyChallengeDocument } from "@/firebase/createDailyDoc"

interface userInput {
    date: string
}

const DailyDocBtn: React.FC<userInput> = ({ date }) => {
        const handleClick = async () => {
            await createDailyChallengeDocument(date)
        }
    
        return (
            <button onClick={handleClick} className="bg-flame text-floralWhite p-4 rounded-xl">
                Create Daily Challenge
            </button>
        )
    }

export default DailyDocBtn