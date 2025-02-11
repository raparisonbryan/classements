"use client"

import { useState, useEffect } from 'react';
import AnimalsComponent from "@/components/animalsComponent/animalsComponent";

interface Cat {
    id: string;
    image: string;
    breed: string;
}

const Battle = () => {
    const [items, setItems] = useState<Cat[]>([]);
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
                            breed: breedData.breeds[0].name,
                        };
                    })
                );
                setItems(catDetail);
            } catch (error) {
                console.error("Erreur lors de la récupération des chiens :", error);
            }
        };

        fetchData();
    }, [apiURL, breedURL]);

    return (
        <div className="h-full">
            <AnimalsComponent items={items} />
        </div>
    );
}

export default Battle;