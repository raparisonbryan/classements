"use client"

import { useState, useEffect } from 'react';
import BattleComponent from "@/components/battleComponent/BattleComponent";

interface Cat {
    id: string;
    image: string;
    name: string;
}

const Battle = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const apiURL = process.env.NEXT_PUBLIC_CAT_API;
    const breedURL = process.env.NEXT_PUBLIC_CAT_BREED_API;

    useEffect(() => {
        const fetchData = async () => {
            if (!apiURL || !breedURL) {
                console.error("L'URL de l'API n'est pas définie");
                return;
            }

            try {
                const imagesResponse = await fetch(`${apiURL}`);
                const imagesData = await imagesResponse.json();

                const catDetail = await Promise.all(
                    imagesData.map(async (cat: { id: string; url: string; }) => {
                        const breedResponse = await fetch(`${breedURL}/${cat.id}`);
                        const breedData = await breedResponse.json();

                        return {
                            id: cat.id,
                            image: cat.url,
                            name: breedData.breeds[0].name,
                        };
                    })
                );
                setCats(catDetail);
            } catch (error) {
                console.error("Erreur lors de la récupération des chiens :", error);
            }
        };

        fetchData();
    }, [apiURL, breedURL]);

    return (
        <div className="h-full">
            <BattleComponent items={cats} />
        </div>
    );
}

export default Battle;