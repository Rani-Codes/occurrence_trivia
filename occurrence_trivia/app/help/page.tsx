const page = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Help Page</h1>
        <h4 className="font-medium">This help page includes a tutorial and a FAQ section</h4>
      </div>
      <div className="flex flex-col justify-center items-center w-full my-4">
        <div className="w-10/12">

          {/* Tutorial Section */}
          <div className="my-4">
            <h2 className="text-xl font-bold text-center">Tutorial</h2>
            
            <h4 className="text-lg font-semibold">1. Make Use of the Hints</h4>
            <p>Once you sign in you will be redirected to the game page where the daily hint will automatically
               pop-up <span className="font-semibold underline decoration-orange-600">carefully examine
                 it!</span> This hint will be your best chance at a high leaderboard placement. 
                 <span className="font-semibold"> Note:</span> If you accidently close the hint reopen it by clicking on the <span className="underline
                  decoration-blue-500 font-semibold">hint</span> button 
            in the home page.</p>

            <h4 className="text-lg font-semibold mt-4">2. Watch Out For Sliders</h4>
            <p>The sliders are set to a default value after every image so even if your sliders are in the middle, 
                if a new image loads up then the date chosen is the one written besides "Date chosen: ". Watch out
                 for this and be careful not to only look at the sliders. <span className="font-semibold underline 
                 decoration-orange-600">Focus on the date chosen value</span>. </p>

            <h4 className="text-lg font-semibold mt-4">3. Fake photos</h4>
            <p>The "Fake Picture" switch doesn't only imply that the image is fake or AI generated, you should toggle
               the fake switch <span className="font-semibold underline decoration-orange-600">whenever you believe
                 the image doesn't belong or is out of place in the daily topic</span>. This is a tricky one, do your 
                 best. If you choose <span className="underline decoration-blue-500 font-semibold">fake image 
                  correctly you get the max points</span> for that image, but if you
                  choose <span className="underline decoration-green-500 font-semibold">incorrectly, you get zero points.
                  </span> The fake toggle is high risk high reward, use it wisely. </p>

            <h4 className="text-lg font-semibold mt-4">4. Years {`>`} Months</h4>
            <p>Points in this game are calculated based on how many months away you are from the correct date. 
               Being 1 year away from the correct answer will result in losing 12 points, whereas being 1 month away will 
               result in losing 1 point. Each individual month isn't always worth 1 point but a year will always be (month_value * 12).{` `}
                <span className="font-semibold underline decoration-orange-600">Focus more on guessing the 
                  year rather than the month</span>. </p>
          </div>

          {/* Images Section */}
          <div className="my-6">
            <h2 className="text-xl font-bold text-center">Tutorial Examples</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">

              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold">Tip 1</h4>
                <img
                  src="/tutorial/hint.png"
                  alt="Hint pop-up example"
                  className="border rounded-lg w-72 h-auto"
                />
                <p className="text-center mt-2">Example of the hint pop-up.</p>
              </div>

              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold">Tip 2</h4>
                <img
                  src="/tutorial/slider_info.png"
                  alt="Slider example"
                  className="border rounded-lg w-72 h-auto"
                />
                <p className="text-center mt-2">Slider resetting for each new image.</p>
              </div>

              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold">Tip 3</h4>
                <img
                  src="/tutorial/fake.png"
                  alt="Fake image toggle example"
                  className="border rounded-lg w-72 h-auto"
                />
                <p className="text-center mt-2">Using the "Fake Image" toggle.</p>
              </div>

              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold">Tip 4</h4>
                <img
                  src="/tutorial/year>month.png"
                  alt="Year focus example"
                  className="border rounded-lg w-72 h-auto"
                />
                <p className="text-center mt-2">Focus more on the year than the month.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="my-4">
            <h2 className="text-xl font-bold">FAQ</h2>
            <p>FAQ content goes here...</p>
          </div>


        </div>
      </div>
    </div>
  )
}

export default page;
