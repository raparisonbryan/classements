import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const paramsData = await params;

        const battle = await prisma.customBattle.findUnique({
            where: {
                id: paramsData.id,
            },
            include: {
                items: true,
            },
        });

        if (!battle) {
            return NextResponse.json({ error: 'Bataille non trouvée' }, { status: 404 });
        }

        return NextResponse.json(battle);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur lors de la récupération de la bataille' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const paramsData = await params;

        await prisma.customBattle.delete({
            where: {
                id: paramsData.id,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur lors de la suppression de la bataille' }, { status: 500 });
    }
}