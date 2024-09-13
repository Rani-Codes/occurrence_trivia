'use client'
import { useState } from "react";
import ToggleFake from "./toggleFake";


interface bounds {
    month: number
    year: number
    onFakeToggle: (isFake: boolean) => void
  }

const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

const DateChosen = ({month, year, onFakeToggle }: bounds, isReal:boolean) => {

    const [isFake, setIsFake] = useState<boolean>(false); // State to manage switch

    const handleToggle = (value: boolean) => {
        setIsFake(value)
        onFakeToggle(value)
      };

    return (
        <>
            <ToggleFake onToggle={handleToggle}/>
            {isFake ? (
                <h3 className="text-lg">
                    Date chosen: Fake!
                </h3>
            ): (
                <h3 className="text-lg">
                    Date chosen: {monthNames[month - 1]} {year}
                </h3>
            )}
        </>
    )
}

export default DateChosen