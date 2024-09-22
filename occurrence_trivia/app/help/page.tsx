import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



const page = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Help Page</h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full my-1 sm:my-4">
        <div className="w-10/12">

          {/* Tutorial Section */}
          <div className="my-4">
            <h2 className="text-xl font-bold text-center py-2 sm:py-0">Tutorial</h2>
            
            <h4 className="text-lg font-semibold">1. Make Use of the Hints</h4>
            <p className="text-sm">Once you sign in you will be redirected to the game page where the daily hint will automatically
               pop-up <span className="font-semibold underline decoration-orange-600">carefully examine
                 it!</span> This hint will be your best chance at a high leaderboard placement. 
                 <span className="font-semibold"> Note:</span> If you accidently close the hint reopen it by clicking on the <span className="underline
                  decoration-blue-500 font-semibold">hint</span> button 
            in the home page.</p>

            <h4 className="text-lg font-semibold mt-4">2. Watch Out for Sliders</h4>
            <p className="text-sm">The sliders are set to a default value after every image so even if your sliders are in the middle, 
                if a new image loads up then the date chosen is the one written besides "Date chosen: ". Watch out
                 for this and be careful not to only look at the sliders. <span className="font-semibold underline 
                 decoration-orange-600">Focus on the date chosen value</span>. </p>

            <h4 className="text-lg font-semibold mt-4">3. Fake photos</h4>
            <p className="text-sm">The "Fake Picture" switch doesn't only imply that the image is fake or AI generated, you should toggle
               the fake switch <span className="font-semibold underline decoration-orange-600">whenever you believe
                 the image doesn't belong or is out of place in the daily topic</span>. This is a tricky one, do your 
                 best. If you choose <span className="underline decoration-blue-500 font-semibold">fake image 
                  correctly you get the max points</span> for that image, but if you
                  choose <span className="underline decoration-green-500 font-semibold">incorrectly, you get zero points.
                  </span> The fake toggle is high risk high reward, use it wisely. </p>

            <h4 className="text-lg font-semibold mt-4">4. Years {`>`} Months</h4>
            <p className="text-sm">Points in this game are calculated based on how many months away you are from the correct date. 
               Being 1 year away from the correct answer will result in losing 12 points, whereas being 1 month away will 
               result in losing 1 point. Each individual month isn't always worth 1 point but a year will always be (month_value * 12).{` `}
                <span className="font-semibold underline decoration-orange-600">Focus more on guessing the 
                  year rather than the month</span>. </p>
          </div>

          {/* Images Section */}
          <div className="my-4">
            <h2 className="text-xl font-bold text-center">Tutorial Examples</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold">Tip 1</h4>
                <img
                  src="/tutorial/hint.png"
                  alt="Hint pop-up example"
                  className="border rounded-lg w-72 h-auto"
                />
                <p className="text-sm sm:text-base text-center mt-2">Example of the hint pop-up.</p>
              </div>

              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold">Tip 2</h4>
                <img
                  src="/tutorial/slider_info.png"
                  alt="Slider example"
                  className="border rounded-lg w-72 h-auto"
                />
                <p className="text-sm sm:text-base text-center mt-2">Slider resetting for each new image.</p>
              </div>

              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold">Tip 3</h4>
                <img
                  src="/tutorial/fake.png"
                  alt="Fake image toggle example"
                  className="border rounded-lg w-72 h-auto"
                />
                <p className="text-sm sm:text-base text-center mt-2">Using the "Fake Image" toggle.</p>
              </div>

              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold">Tip 4</h4>
                <img
                  src="/tutorial/year>month.png"
                  alt="Year focus example"
                  className="border rounded-lg w-72 h-auto"
                />
                <p className="text-sm sm:text-base text-center mt-2">Focus more on the year than the month.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="my-4">
          <h2 className="text-xl font-bold text-center pt-12 sm:pt-0">FAQ</h2>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">How does the leaderboard work?</AccordionTrigger>
                <AccordionContent className="text-base">
                  The leaderboard displays the top 10 highest scores from all users who complete the that 
                  day's challenge. It is there to congratulate those who scored highly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg">Can I retry the daily challenge?</AccordionTrigger>
                <AccordionContent className="text-base">
                  No, you can only attempt the daily challenge once per day. Your score will be recorded,
                   and you will have to wait for the next day's challenge.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg">What happens if I close the game or my browser crashes?</AccordionTrigger>
                <AccordionContent className="text-base">
                  Don't worry! If your session is interrupted, you will be able to return to the challenge and complete 
                  it again. As long as you haven't seen your total score you will be able to complete the challenge again.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg">How do I unlock new challenges?</AccordionTrigger>
                <AccordionContent className="text-base">
                  A new challenge becomes available every day. You can participate in the daily challenge once per day.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg">Can I view my previous scores?</AccordionTrigger>
                <AccordionContent className="text-base">
                  Yes, you can track your past scores in your profile under the "Score History" section.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg">What is the 'fake photo' feature?</AccordionTrigger>
                <AccordionContent className="text-base">
                  This feature allows you to guess if a photo is out of place in the daily challenge theme. 
                  Guessing correctly awards you maximum points, while guessing incorrectly results in zero points for that image.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg">How do hints help me?</AccordionTrigger>
                <AccordionContent className="text-base">
                  Hints provide useful information about the day's challenge theme, helping you make more accurate guesses.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-lg">Why isn't my score showing on the leaderboard?</AccordionTrigger>
                <AccordionContent className="text-base">
                  Only the top 10 scores are shown on the leaderboard. If your score is below that, it won't be displayed.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Bugs & Features Section */}
          <div className="my-16 sm:my-20 text-center">
            <h2 className="text-xl font-bold">Feedback</h2>
            <h4 className="font-medium text-base sm:text-lg">Found a bug or have an idea for a new feature? Click the button below to let me know.</h4>
            
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdihQ4puFyMDeMRGhS2QK5x5lKGR9ykzJx_6NeBTTdZShwTEQ/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-2 bg-flame hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                Submit Feedback
              </button>
            </a>

          </div>

        </div>
      </div>
    </div>
  )
}

export default page;
