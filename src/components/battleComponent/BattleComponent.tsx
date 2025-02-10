import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';

interface Item {
    id: string;
    name: string;
    reference_image_id?: string;
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
        <div className="max-w-4xl h-screen mx-auto p-4">
            {!isComplete ? (
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Quelle option préférez-vous ?
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="hover:shadow-lg transition-shadow cursor-pointer"
                              onClick={() => handleChoice(currentPair!.item1)}>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-semibold">{currentPair!.item1.name}</h3>
                                {currentPair!.item1.reference_image_id && (
                                    <img
                                        src={`https://cdn2.thedogapi.com/images/${currentPair!.item1.reference_image_id}.jpg`}
                                        alt={currentPair!.item1.name}
                                        className="mt-4 mx-auto max-w-full h-48 object-contain"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="hover:shadow-lg transition-shadow cursor-pointer"
                              onClick={() => handleChoice(currentPair!.item2)}>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-semibold">{currentPair!.item2.name}</h3>
                                {currentPair!.item2.reference_image_id && (
                                    <img
                                        src={`https://cdn2.thedogapi.com/images/${currentPair!.item2.reference_image_id}.jpg`}
                                        alt={currentPair!.item2.name}
                                        className="mt-4 mx-auto max-w-full h-48 object-contain"
                                    />
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
                                        {item.reference_image_id && (
                                            <img
                                                src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
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
                Retour à l'accueil
            </button>
        </div>
    );
};

export default BattleComponent;