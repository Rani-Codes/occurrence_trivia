
interface bounds {
    month: number
    year: number
  }

const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

const DateChosen = ({month, year}: bounds) => {
    return (
        <div>
            <h3 className="text-lg">
                Date chosen: {monthNames[month - 1]} {year}
            </h3>
        </div>
    )
}

export default DateChosen