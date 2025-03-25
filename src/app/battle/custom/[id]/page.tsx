"use client";

import {useState, useEffect} from 'react';
import {useParams} from 'next/navigation';
import BattleComponent from "@/components/battleComponent/BattleComponent";

interface CustomItem {
    id: string;
    image: string;
    name: string;
}

interface CustomBattle {
    id: string;
    name: string;
    items: CustomItem[];
}

const Battle = () => {
    const params = useParams();
    const [battle, setBattle] = useState<CustomBattle | null>(null);

    useEffect(() => {
        const battleId = params.id;

        const fetchBattle = async () => {
            try {
                const response = await fetch(`/api/battle/${battleId}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        new Error('Bataille non trouvée');
                    }
                    new Error('Erreur lors du chargement de la bataille');
                }

                const data = await response.json();
                setBattle(data);
            } catch (error) {
                console.error('Erreur lors du chargement de la bataille :', error);
            }
        };

        fetchBattle();
    }, [params.id]);

    if (!battle) {
        return (
            <div className="flex items-center justify-center h-screen text-white">
                <div className="text-xl">Chargement...</div>
            </div>
        );
    }

    return (
        <div className="h-full">
            <BattleComponent items={battle.items}/>
        </div>
    );
};

export default Battle;