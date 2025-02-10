"use client"

import { useState, useEffect } from 'react';
import BattleComponent from "@/components/battleComponent/BattleComponent";

const Battle = () => {
    const [items, setItems] = useState([]);

    const fetchData = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_DOG_API;
        if (!apiUrl) {
            console.error('API URL not found');
            return;
        }
        const response = await fetch(apiUrl);
        const data = await response.json();
        setItems(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="h-full">
            <BattleComponent items={items}/>
        </div>
    );
}

export default Battle;