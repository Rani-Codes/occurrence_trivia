import Leaderboard from "@/components/leaderboard";
import { getCurrentDateString } from "@/utils/dateUtils";

const Page = () => {
  const dayChosen = getCurrentDateString(); // Get the current date in MM-DD-YYYY format

  return (
    <div>
      <Leaderboard dayChosen={dayChosen} />
    </div>
  );
};

export default Page;
