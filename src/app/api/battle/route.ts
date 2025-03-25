import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const battles = await prisma.customBattle.findMany({
            include: {
                items: true,
            },
        });
        return NextResponse.json(battles);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Erreur lors de la récupération des batailles' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, items } = body;

        if (!name || !items || !Array.isArray(items) || items.length < 3) {
            return NextResponse.json(
                { error: 'Données invalides. Le nom et au moins 3 éléments sont requis.' },
                { status: 400 }
            );
        }

        const battle = await prisma.customBattle.create({
            data: {
                name,
                items: {
                    createMany: {
                        data: items.map((item: { name: string; image: string }) => ({
                            name: item.name,
                            image: item.image,
                        })),
                    },
                },
            },
            include: {
                items: true,
            },
        });

        return NextResponse.json(battle);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Erreur lors de la création de la bataille' }, { status: 500 });
    }
}