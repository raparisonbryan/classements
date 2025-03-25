"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

interface CustomItem {
    id: string;
    image: string;
    name: string;
}

interface CustomBattle {
    id: string;
    name: string;
    items: CustomItem[];
}

const BattleList = () => {
    const router = useRouter();
    const [battle, setbattle] = useState<CustomBattle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchbattle = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/battle');

            if (!response.ok) {
                new Error('Erreur lors de la récupération des batailles');
            }

            const data = await response.json();
            setbattle(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Une erreur est survenue');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchbattle();
    }, []);

    const handleStartBattle = (id: string) => {
        router.push(`/battle/custom/${id}`);
    };

    const handleDeleteBattle = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette bataille ?')) {
            try {
                const response = await fetch(`/api/battle/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    new Error('Erreur lors de la suppression de la bataille');
                }

                setbattle(prevbattle => prevbattle.filter(battle => battle.id !== id));
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                } else {
                    alert('Une erreur est survenue');
                }
            }
        }
    };

    const handleCreateBattle = () => {
        router.push('/create');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center text-center h-screen text-white">
                <div className="text-xl">Chargement des batailles...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full p-4 text-white">
                <div className="text-red-400 mb-4">{error}</div>
                <button
                    onClick={fetchbattle}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col p-10 gap-5 w-full h-screen bg-neutral-50 text-black">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-black">Mes Batailles Personnalisées</h1>
                <button
                    onClick={handleCreateBattle}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Créer une nouvelle bataille
                </button>
            </div>

            {battle.length === 0 ? (
                <p className="text-center text-gray-500">
                    Aucune bataille personnalisée trouvée
                </p>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {battle.map(battle => (
                        <div key={battle.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-[#182C4C] border-[#304669]">
                            <div className="relative h-48 bg-[#0B162C]">
                                {battle.items[0] && (
                                    <Image
                                        src={battle.items[0].image}
                                        alt={battle.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <h2 className="text-xl font-bold text-white text-center px-2">{battle.name}</h2>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-300 mb-4">{battle.items.length} éléments</p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => handleStartBattle(battle.id)}
                                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                                    >
                                        Démarrer
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBattle(battle.id)}
                                        className="text-red-400 px-3 py-1 border border-red-400 rounded-md hover:bg-red-900"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BattleList;