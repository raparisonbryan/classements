"use client"

import {useEffect, useState} from "react";
import BattleComponent from "@/components/battleComponent/BattleComponent";

interface Game {
    id: string;
    image: string;
    name: string;
}

const Battle = () => {
    const [games, setGames] = useState<Game[]>([]);
    const apiURL = process.env.NEXT_PUBLIC_GAME_API;
    const apiKey = process.env.NEXT_PUBLIC_GAME_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            if (!apiURL) {
                console.error("L'URL de l'API n'est pas définie");
                return;
            }

            try {
                const response = await fetch(`${apiURL}?key=${apiKey}&page_size=40&ordering=-ratings`);
                const data = await response.json();

                const gameDetail = data.results
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 10)
                    .map(game => ({
                        id: game.id,
                        image: game.background_image,
                        name: game.name
                    }));

                setGames(gameDetail);
            } catch (error) {
                console.error("Erreur lors de la récupération des jeux :", error);
            }
        };

        fetchData();
    }, [apiURL, apiKey]);

    return (
        <div className={"h-full"}>
            <BattleComponent items={games}/>
        </div>
    )
}

export default Battle