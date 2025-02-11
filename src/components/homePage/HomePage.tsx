"use client"

import {useRouter} from "next/navigation";
import Image from "next/image";

const HomePage = () => {
    const router = useRouter();

    const cards = [
        {
            title: "Chiens",
            description: "Classez une sélection aléatoire de 10 races de chiens",
            src: "https://cdn2.thedogapi.com/images/B1ruWl94Q_1280.jpg",
            alt: "dog",
            onClick: () => {router.push('/battle/dogs')}
        },
        {
            title: "Chats",
            description: "Classez une sélection aléatoire de 10 races de chats",
            src: "https://cdn2.thecatapi.com/images/avb.jpg",
            alt: "cat",
            onClick: () => {router.push('/battle/cats')}
        },
        {
            title: "Jeux vidéos",
            description: "Classez une sélection aléatoire de 10 jeux parmi les 40 meilleurs jeux selon les critiques",
            src: "/rdr2.webp",
            alt: "game",
            onClick: () => {router.push('/battle/games')}
        },
        {
            title: "Films",
            description: "Classez une sélection aléatoire de 10 films parmi les mieux notés selon les critiques",
            src: "/interstellar.jpg",
            alt: "movie",
            onClick: () => {router.push('/battle/movies')}
        }
    ];

    return (
        <div className="flex flex-col p-10 gap-5 w-full bg-neutral-50">
            <h1 className="text-3xl text-black">Choisi un thème</h1>
            <div className="w-3/4 h-[1px] bg-black"></div>
            <div className="pt-10 grid grid-cols-2 gap-5">
                {cards.map((card, index) => (
                    <div key={index}
                        className="flex w-full gap-5 rounded overflow-hidden shadow-xl hover:shadow-md"
                        onClick={card.onClick}>
                        <div className="w-2/5">
                            <div className="relative h-[200px] overflow-hidden">
                                <Image
                                    fill
                                    alt={card.alt}
                                    className="object-cover"
                                    src={card.src} />
                            </div>
                        </div>
                        <div className="flex flex-col w-3/5 gap-2.5 p-2">
                            <h2 className="text-xl text-black">{card.title}</h2>
                            <p className="text-black text-sm">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;