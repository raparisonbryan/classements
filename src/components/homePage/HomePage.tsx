"use client"

import { Card } from 'antd';
import {useRouter} from "next/navigation";
import Image from "next/image";

const HomePage = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col p-10 gap-5 w-full bg-neutral-50">
            <h1 className="text-3xl text-black">Choisi un thème</h1>
            <div className="w-3/4 h-[1px] bg-black"></div>
            <div className="pt-10 grid grid-cols-3 gap-5">
                <Card
                    hoverable
                    style={{ width: "100%", boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)" }}
                    cover={
                        <div className="relative h-[250px] overflow-hidden">
                            <Image
                                fill
                                alt="dog"
                                className="object-cover"
                                src="https://cdn2.thedogapi.com/images/B1ruWl94Q_1280.jpg" />
                        </div>
                    }
                    onClick={() => {router.push('/battle/dogs')}}
                >
                    <h2 className="text-xl">Chiens</h2>
                    <p>Classez une sélection aléatoire de 10 races de chiens</p>
                </Card>
                <Card
                    hoverable
                    style={{ width: "100%", boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)" }}
                    cover={
                        <div className="relative h-[250px] overflow-hidden">
                            <Image
                                fill
                                alt="cat"
                                className="object-cover"
                                src="https://cdn2.thecatapi.com/images/avb.jpg" />
                        </div>
                    }
                    onClick={() => {router.push('/battle/cats')}}
                >
                    <h2 className="text-xl">Chats</h2>
                    <p>Classez une sélection aléatoire de 10 races de chats</p>
                </Card>
                <Card
                    hoverable
                    style={{ width: "100%", boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)" }}
                    cover={
                        <div className="relative h-[250px] overflow-hidden">
                            <Image
                                fill
                                alt="game"
                                className="object-cover"
                                src="/rdr2.webp" />
                        </div>
                    }
                    onClick={() => {router.push('/battle/games')}}
                >
                    <h2 className="text-xl">Jeux vidéos</h2>
                    <p>Classez une sélection aléatoire de 10 jeux parmi les 40 meilleurs jeux selon les critiques</p>
                </Card>
            </div>
        </div>
    );
}

export default HomePage;