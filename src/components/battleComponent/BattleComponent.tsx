import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';
import Image from "next/image";
import { useRanking} from "@/hooks/useRanking";

interface Item {
    id: string;
    image: string;
    name: string;
}

interface Pair {
    item1: Item;
    item2: Item;
}

interface BattleComponentProps {
    items: Item[];
}

const BattleComponent = ({ items: initialItems }: BattleComponentProps) => {
    const [items, setItems] = useState<Item[]>([]);
    const [currentPair, setCurrentPair] = useState<Pair | null>(null);
    const [rankings, setRankings] = useState<Item[]>([]);
    const [remainingPairs, setRemainingPairs] = useState<Pair[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const router = useRouter();
    const { saveRanking } = useRanking();

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
        return pairs.sort(() => Math.random() - 0.5);
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

            // Cas 1 : Si le classement est vide
            if (newRankings.length === 0) {
                return [winner, loser];
            }

            // Cas 2 : Si le gagnant et le perdant ne sont pas encore classés
            if (!newRankings.find(item => item.id === winner.id) &&
                !newRankings.find(item => item.id === loser.id)) {
                return [...newRankings, winner, loser];
            }

            // Cas 3 : Si seul le gagnant est déjà classé
            if (newRankings.find(item => item.id === winner.id) &&
                !newRankings.find(item => item.id === loser.id)) {
                const winnerIndex = newRankings.findIndex(item => item.id === winner.id);
                newRankings.splice(winnerIndex + 1, 0, loser);
                return newRankings;
            }

            // Cas 4 : Si seul le perdant est déjà classé
            if (!newRankings.find(item => item.id === winner.id) &&
                newRankings.find(item => item.id === loser.id)) {
                const loserIndex = newRankings.findIndex(item => item.id === loser.id);
                newRankings.splice(loserIndex, 0, winner);
                return newRankings;
            }

            // Cas 5 : Si les deux sont déjà classés
            const winnerIndex = newRankings.findIndex(item => item.id === winner.id);
            const loserIndex = newRankings.findIndex(item => item.id === loser.id);

            // Si le classement actuel est cohérent avec le résultat, ne rien faire
            if (winnerIndex < loserIndex) {
                return newRankings;
            }

            // Sinon, réorganiser le classement
            newRankings.splice(loserIndex, 1);
            const newLoserPosition = winnerIndex + 1;
            newRankings.splice(newLoserPosition, 0, loser);

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
            saveRanking(rankings);
        }
    };


    if (!currentPair && !isComplete) {
        return <div className="text-center p-4">Chargement...</div>;
    }

    return (
        <div className="flex items-center justify-center max-w-4xl h:full sm:h-screen p-4 mx-auto">
            {!isComplete ? (
                <div className="space-y-8">
                    <h2 className="text-xl sm:text-3xl font-bold text-center mb-8 mt-12 sm:mt-0">
                        Que préférez-vous ?
                    </h2>
                    <div className="sm:grid sm:grid-cols-2 gap-4">
                        <div className="cursor-pointer"
                              onClick={() => handleChoice(currentPair!.item1)}>
                            <div className="flex flex-col p-6 text-center">
                                {currentPair!.item1.image && (
                                    <div className="relative overflow-hidden mb-4 mx-auto w-60 h-48 rounded-xl">
                                        <Image
                                            fill
                                            src={currentPair!.item1.image}
                                            alt={currentPair!.item1.name}
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold">{currentPair!.item1.name}</h3>
                            </div>
                        </div>
                        <div className="cursor-pointer"
                              onClick={() => handleChoice(currentPair!.item2)}>
                            <div className="flex flex-col p-6 text-center">
                                {currentPair!.item2.image && (
                                    <div className="relative overflow-hidden mb-4 mx-auto w-60 h-48 rounded-xl">
                                        <Image
                                            fill
                                            src={currentPair!.item2.image}
                                            alt={currentPair!.item2.name}
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold">{currentPair!.item2.name}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                        Reste {remainingPairs.length} comparaisons
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold text-center mt-12 sm:mt-0 mb-8">
                        Classement Final
                    </h2>
                    <div className="sm:grid sm:grid-cols-2 gap-4">
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
                                                    alt={item.name}
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <h3 className="font-semibold">{item.name}</h3>
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

export default BattleComponent;