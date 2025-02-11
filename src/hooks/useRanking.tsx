import { useEffect, useState } from 'react';

interface Item {
    id: string;
    image: string;
    name: string;
}

interface RankingSession {
    id: string;
    rankings: Item[];
    timestamp: number;
}

interface StoredData {
    token: string;
    expiresAt: number;
    sessions: RankingSession[];
}

export const useRanking = () => {
    const [sessions, setSessions] = useState<RankingSession[]>([]);

    const generateToken = () => {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    };

    useEffect(() => {
        const checkAndLoadSessions = () => {
            const storedData = localStorage.getItem('rankingHistory');
            if (storedData) {
                const data: StoredData = JSON.parse(storedData);
                const now = Date.now();

                if (now > data.expiresAt) {
                    const newData: StoredData = {
                        token: generateToken(),
                        expiresAt: now + 3600000, // token d'une heure
                        sessions: []
                    };
                    localStorage.setItem('rankingHistory', JSON.stringify(newData));
                    setSessions([]);
                } else {
                    const recentSessions = data.sessions.filter(
                        session => now - session.timestamp < 3600000
                    );
                    setSessions(recentSessions);

                    const updatedData = {
                        ...data,
                        sessions: recentSessions
                    };
                    localStorage.setItem('rankingHistory', JSON.stringify(updatedData));
                }
            } else {
                const newData: StoredData = {
                    token: generateToken(),
                    expiresAt: Date.now() + 3600000,
                    sessions: []
                };
                localStorage.setItem('rankingHistory', JSON.stringify(newData));
            }
        };

        checkAndLoadSessions();
        const interval = setInterval(checkAndLoadSessions, 60000);
        return () => clearInterval(interval);
    }, []);

    const saveRanking = (rankings: Item[]) => {
        const storedData = localStorage.getItem('rankingHistory');
        if (storedData) {
            const data: StoredData = JSON.parse(storedData);
            const now = Date.now();

            if (now <= data.expiresAt) {
                const newSession: RankingSession = {
                    id: generateToken(),
                    rankings,
                    timestamp: now
                };

                const updatedSessions = [...data.sessions, newSession];
                const updatedData = {
                    ...data,
                    sessions: updatedSessions
                };

                localStorage.setItem('rankingHistory', JSON.stringify(updatedData));
                setSessions(updatedSessions);
            }
        }
    };

    return { sessions, saveRanking };
};