"use client"

import {useEffect, useState} from "react";
import BattleComponent from "@/components/battleComponent/BattleComponent";

interface Movie {
    id: string;
    image: string;
    name: string;
}

const Battle = () => {
    const [movie, setMovie] = useState<Movie[]>([]);
    const apiURL = process.env.NEXT_PUBLIC_MOVIE_API;
    const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            if (!apiURL) {
                console.error("L'URL de l'API n'est pas définie");
                return;
            }

            try {
                const response = await fetch(`${apiURL}?language=en-US&page=1`,
                    {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            Authorization: 'Bearer ' + apiKey
                        }
                    })
                const data = await response.json();

                const movieDetail = data.results
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 10)
                    .map((movie: { id: string; poster_path: string; title: string; }) => ({
                        id: movie.id,
                        image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                        name: movie.title
                    }));

                setMovie(movieDetail);
            } catch (error) {
                console.error("Erreur lors de la récupération des jeux :", error);
            }
        };

        fetchData();
    }, [apiURL, apiKey]);

    return (
        <div className={"h-full"}>
            <BattleComponent items={movie}/>
        </div>
    )
}

export default Battle