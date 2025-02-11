"use client"

import { useState, useEffect } from 'react';
import BattleComponent from "@/components/battleComponent/BattleComponent";

interface Dog {
    id: string;
    image: string;
    name: string;
}

const Battle = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const apiURL = process.env.NEXT_PUBLIC_DOG_API;
    const breedURL = process.env.NEXT_PUBLIC_DOG_BREED_API;

    useEffect(() => {
        const fetchData = async () => {
            if (!apiURL || !breedURL) {
                console.error("L'URL de l'API n'est pas définie");
                return;
            }

            try {
                const imagesResponse = await fetch(`${apiURL}`);
                const imagesData = await imagesResponse.json();

                const dogDetail = await Promise.all(
                    imagesData.map(async (dog: { id: string; url: string; }) => {
                        const breedResponse = await fetch(`${breedURL}/${dog.id}`);
                        const breedData = await breedResponse.json();

                        return {
                            id: dog.id,
                            image: dog.url,
                            name: breedData.breeds[0].name,
                        };
                    })
                );
                setDogs(dogDetail);
            } catch (error) {
                console.error("Erreur lors de la récupération des chiens :", error);
            }
        };

        fetchData();
    }, [apiURL, breedURL]);

    return (
        <div className="h-full">
            <BattleComponent items={dogs} />
        </div>
    );
}

export default Battle;