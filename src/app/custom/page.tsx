"use client"

import Dashboard from "@/components/dashboard/Dashboard";
import BattleList from "@/components/customBattle/BattleList";

const Custom = () => {

    return (
        <div className="flex bg-[#0B162C]">
            <Dashboard/>
            <BattleList />
        </div>
    );
};

export default Custom;