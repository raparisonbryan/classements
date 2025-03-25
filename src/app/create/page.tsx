"use client"

import Dashboard from "@/components/dashboard/Dashboard";
import CustomBattle from "@/components/customBattle/CustomBattle";

const CreateBattle = () => {

    return (
        <div className="flex bg-[#0B162C]">
            <Dashboard/>
            <CustomBattle />
        </div>
    );
};

export default CreateBattle;