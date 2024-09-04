import Card from "@/components/card";
import CostumSlider from "@/components/slider"

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Card/>
      <div className="flex justify-center w-full text-eerieBlack">
        <CostumSlider/>
      </div>
    </main>
  );
}
