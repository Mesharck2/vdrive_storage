import { Chart } from "@/components/Chart";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (

    <div className="dashboard-container flex h-screen justify-between gap-5 bg-black px-2 py-3">

      <div className="w-full"> 
        <Chart classNames="color-white flex h-1/3 bg-red text-white" />
      </div>

      {/* <div className="">
      </div> */}

      <Card className="size-full px-10 py-8">
          <h1 className="h2">Recent files uploaded</h1>
      </Card>
      
      
      
    </div>
  );
}
