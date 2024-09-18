import Leaderboard from "@/components/leaderboard"
import { dayChosen } from "@/components/dailyGame"

const page = () => {
    return (
      <div>
        <Leaderboard dayChosen={dayChosen}/>
      </div>
    )
  }
  
  export default page