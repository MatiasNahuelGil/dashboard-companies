

import { CardSummary } from "./components/CardSummary";
import { BookOpenCheck, UsersRound, Waypoints } from "lucide-react";
import { LastCustomers } from "./components/LastCustomers";
import { SalesDistributor } from "./components/SalesDistributor";
import { TotalSuscribers } from "./components/TotalSuscribers";
import { ListIntegrations } from "./components/ListIntegrations";


const dataCardsSummary = [
  {
    icon: UsersRound,
    total: "12.450",
    average: 15,
    title: "Companies created",
    tooltipText: "See all of the companies created"
  },
  {
    icon: Waypoints,
    total: "86.5%",
    average: 80,
    title: "Total Revenue",
    tooltipText: "See all of the summary"

  },
  {
    icon: BookOpenCheck,
    total: "363,95€",
    average: 30,
    title: "Bounce rate",
    tooltipText: "See all of the bounce rate"
  },
]

export default function Home() {
  return (
    <>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
        {dataCardsSummary.map(({title,icon,total,average,tooltipText}) => {
          return <>
            <CardSummary 
            key={title}
            icon={icon} 
            total={total} 
            average={average} 
            title={title}
            tooltipText={tooltipText}
            />
          </>
        })}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2  md:gap-x-10 mt-12">
           <LastCustomers/>
           <SalesDistributor/>
      </div>

      <div className="flex-col xl:flex xl:flex-row gap-x-4 gap-y-4 md:gap-y-0 mt-12 md:mb-10 justify-center">
          <TotalSuscribers/>
          <ListIntegrations/>
      </div>

    </>

  );
}
