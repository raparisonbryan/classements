import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';
import Image from "next/image";

interface Item {
    id: string;
    breed: string;
    image?: string;
}

interface Pair {
    item1: Item;
    item2: Item;
}

interface BattleComponentProps {
    items: Item[];
}

const AnimalsComponent = ({ items: initialItems }: BattleComponentProps) => {
    const [items, setItems] = useState<Item[]>([]);
    const [currentPair, setCurrentPair] = useState<Pair | null>(null);
    const [rankings, setRankings] = useState<Item[]>([]);
    const [remainingPairs, setRemainingPairs] = useState<Pair[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const router = useRouter();

    const generatePairs = (items: Item[]): Pair[] => {
        const pairs: Pair[] = [];
        for (let i = 0; i < items.length; i++) {
            for (let j = i + 1; j < items.length; j++) {
                pairs.push({
                    item1: items[i],
                    item2: items[j],
                });
            }
        }
        return pairs;
    };

    useEffect(() => {
        if (initialItems.length > 0) {
            setItems(initialItems);
            const pairs = generatePairs(initialItems);
            setRemainingPairs(pairs);
            setCurrentPair(pairs[0]);
        }
    }, [initialItems]);

    const updateRankings = (winner: Item, loser: Item) => {
        setRankings(prevRankings => {
            const newRankings = [...prevRankings];

            if (!newRankings.find(item => item.id === winner.id)) {
                newRankings.push(winner);
            }

            if (!newRankings.find(item => item.id === loser.id)) {
                const winnerIndex = newRankings.findIndex(item => item.id === winner.id);
                newRankings.splice(winnerIndex + 1, 0, loser);
            }

            return newRankings;
        });
    };

    const handleChoice = (chosenItem: Item) => {
        if (!currentPair) return;

        const otherItem = chosenItem.id === currentPair.item1.id ? currentPair.item2 : currentPair.item1;
        updateRankings(chosenItem, otherItem);

        const newRemainingPairs = remainingPairs.slice(1);
        setRemainingPairs(newRemainingPairs);

        if (newRemainingPairs.length > 0) {
            setCurrentPair(newRemainingPairs[0]);
        } else {
            setIsComplete(true);
        }
    };

    if (!currentPair && !isComplete) {
        return <div className="text-center p-4">Chargement...</div>;
    }

    return (
        <div className="flex items-center justify-center max-w-4xl h-screen p-4 mx-auto">
            {!isComplete ? (
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Que préférez-vous ?
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="hover:shadow-lg transition-shadow cursor-pointer"
                              onClick={() => handleChoice(currentPair!.item1)}>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-semibold">{currentPair!.item1.breed}</h3>
                                {currentPair!.item1.image && (
                                    <div className="relative overflow-hidden mt-4 mx-auto w-60 h-48 rounded-xl">
                                        <Image
                                            fill
                                            src={currentPair!.item1.image}
                                            alt={currentPair!.item1.breed}
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="hover:shadow-lg transition-shadow cursor-pointer"
                              onClick={() => handleChoice(currentPair!.item2)}>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-semibold">{currentPair!.item2.breed}</h3>
                                {currentPair!.item2.image && (
                                    <div className="relative overflow-hidden mt-4 mx-auto w-60 h-48 rounded-xl">
                                        <Image
                                            fill
                                            src={currentPair!.item2.image}
                                            alt={currentPair!.item2.breed}
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                        Reste {remainingPairs.length} comparaisons
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Classement Final
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {rankings.map((item, index) => (
                            <div key={item.id}>
                                <div className="p-4 flex items-center">
                                    <span className="font-bold mr-4 text-xl">{index + 1}</span>
                                    <div className="flex gap-2 items-center">
                                        {item.image && (
                                            <div className="relative overflow-hidden w-20 h-20 rounded">
                                                <Image
                                                    fill
                                                    src={item.image}
                                                    alt={item.breed}
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <h3 className="font-semibold">{item.breed}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            setRankings([]);
                            setRemainingPairs(generatePairs(items));
                            setCurrentPair(generatePairs(items)[0]);
                            setIsComplete(false);
                        }}
                        className="absolute top-4 left-4 border border-neutral-50 text-white p-2 rounded text-xs"
                    >
                        Recommencer
                    </button>
                </div>
            )}

            <button
                onClick={() => {
                    setRankings([]);
                    setRemainingPairs(generatePairs(items));
                    setCurrentPair(generatePairs(items)[0]);
                    setIsComplete(false);
                    router.push('/')
                }}
                className="absolute top-4 right-4 border border-neutral-50 text-white p-2 rounded text-xs"
            >
                Retour à l&#39;accueil
            </button>
        </div>
    );
};

export default AnimalsComponent;