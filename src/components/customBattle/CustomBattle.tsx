"use client";

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Image from "next/image";

interface CustomItem {
    id?: string;
    image: string;
    name: string;
}

const CustomBattle = () => {
    const router = useRouter();
    const [items, setItems] = useState<CustomItem[]>([]);
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [battleName, setBattleName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isValidImageUrl = (url: string) => {
        if (!url) return false;
        const pattern = new RegExp('^https?:\\/\\/.+\\.(jpeg|jpg|png|gif|webp)$', 'i');
        return pattern.test(url);
    };

    const handleAddItem = () => {
        if (!name.trim()) {
            setError('Le nom est requis');
            return;
        }

        if (!isValidImageUrl(imageUrl)) {
            setError("L'URL de l'image doit être valide (JPG, PNG, GIF, WEBP)");
            return;
        }

        if (items.length >= 10) {
            setError('Maximum 10 éléments');
            return;
        }

        const newItem: CustomItem = {
            name: name.trim(),
            image: imageUrl.trim()
        };

        setItems(prevItems => [...prevItems, newItem]);
        setName('');
        setImageUrl('');
        setError('');
    };

    const handleRemoveItem = (index: number) => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const handleSaveBattle = async () => {
        if (!battleName.trim()) {
            setError('Le nom de la bataille est requis');
            return;
        }

        if (items.length < 3) {
            setError('Minimum 3 éléments requis');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/battle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: battleName.trim(),
                    items: items
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                new Error(data.error || 'Erreur lors de la création de la bataille');
            }

            const battle = await response.json();

            router.push(`/battle/custom/${battle.id}`);

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

    return (
        <div className="flex flex-col p-10 gap-5 w-full h-screen bg-neutral-50 text-black">
            <h1 className="text-3xl font-bold mb-8">Créez une bataille personnalisée</h1>

            <div>
                <label className="block mb-2 font-medium">Nom de la bataille</label>
                <input
                    type="text"
                    value={battleName}
                    onChange={(e) => setBattleName(e.target.value)}
                    placeholder="Ex: Mes films préférés"
                    className="w-full p-2 border rounded-md bg-gray-100 border-gray-200 text-black"
                    disabled={isLoading}
                />
            </div>

            <div className="p-4 border rounded-md bg-[#0B162C] text-white">
                <h2 className="text-xl font-medium mb-4">Ajouter un élément</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1">Nom</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Le Seigneur des Anneaux"
                            className="w-full p-2 border rounded-md bg-[#0B162C] border-[#304669] text-white"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="block mb-1">URL de l&#39;image</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full p-2 border rounded-md bg-[#0B162C] border-[#304669] text-white"
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <button
                    onClick={handleAddItem}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50"
                    disabled={isLoading}
                >
                    Ajouter
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-900 text-white rounded-md">
                    {error}
                </div>
            )}

            <div>
                <h2 className="text-xl font-medium mb-2">Éléments ({items.length}/10)</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map((item, index) => (
                        <div key={index} className="border rounded-md relative bg-[#182C4C] border-[#304669] text-white">
                            <div className="relative h-[200px] mb-2 overflow-hidden rounded-md">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="font-medium truncate p-2">{item.name}</div>
                            <button
                                onClick={() => handleRemoveItem(index)}
                                className="absolute top-2 right-2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center disabled:bg-gray-600"
                                disabled={isLoading}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => router.push('/custom')}
                    className="px-4 py-2 border rounded-md border-[#0B162C] hover:bg-gray-100 disabled:opacity-50"
                    disabled={isLoading}
                >
                    Annuler
                </button>
                <button
                    onClick={handleSaveBattle}
                    disabled={items.length < 3 || !battleName.trim() || isLoading}
                    className={`px-4 py-2 rounded-md ${
                        items.length < 3 || !battleName.trim() || isLoading
                            ? 'bg-gray-600 cursor-not-allowed opacity-50'
                            : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                >
                    {isLoading ? 'Création en cours...' : 'Créer la bataille'}
                </button>
            </div>
        </div>
    );
};

export default CustomBattle;