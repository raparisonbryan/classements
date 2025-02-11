import Image from "next/image";
import { useRanking } from "@/hooks/useRanking";

const RankingComponent = () => {
    const { sessions } = useRanking();

    return (
        <div className="flex flex-col p-10 gap-5 w-full bg-neutral-50">
            <h1 className="text-3xl font-bold text-black mb-8">Historique des classements</h1>
            {sessions.length === 0 ? (
                <p className="text-center text-gray-500">
                    Aucun classement effectué dans la dernière heure
                </p>
            ) : (
                <div className="space-y-8">
                    {sessions.map((session) => (
                        <div key={session.id} className="border rounded-lg p-4">
                            <div className="flex justify-between mb-4">
                                <h2 className="text-xl font-semibold text-black">
                                    Classement du {new Date(session.timestamp).toLocaleString()}
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {Math.floor((Date.now() - session.timestamp) / 60000)} min
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {session.rankings.map((item, index) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <span className="font-bold text-black">{index + 1}</span>
                                        {item.image && (
                                            <div className="relative w-16 h-16">
                                                <Image
                                                    fill
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="object-cover rounded"
                                                />
                                            </div>
                                        )}
                                        <span className="text-black">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RankingComponent;