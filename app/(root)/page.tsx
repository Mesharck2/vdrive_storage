import { Chart } from "@/components/Chart";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (

    <div className="dashboard-container justify-between bg-black flex gap-5 h-screen py-3 px-2">

      <div className="w-full"> 
        <Chart className="bg-red color-white h-1/3 text-white" />
      </div>

      {/* <div className="">
      </div> */}

      <Card className="h-full w-full px-10 py-8">
          <h1 className="h2">Recent files uploaded</h1>
      </Card>
      
      
      
    </div>
  );
}
