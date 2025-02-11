"use client"

import Dashboard from "@/components/dashboard/Dashboard";
import RankingComponent from "@/components/rankingComponent/RankingComponent";

const Ranking = () => {

    return (
        <div className="flex bg-[#0B162C]">
            <Dashboard/>
            <RankingComponent/>
        </div>
    );
};

export default Ranking;