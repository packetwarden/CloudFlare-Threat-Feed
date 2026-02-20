import { NextResponse } from 'next/server';
import { getThreatData } from '@/lib/data/threats';

export const runtime = 'edge';

// This is the endpoint the frontend will call to get the latest data
export async function GET() {
    try {
        const data = await getThreatData();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching threat data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch threat data' },
            { status: 500 }
        );
    }
}
