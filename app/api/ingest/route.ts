import { NextResponse } from 'next/server';
import type { ThreatData } from '@/lib/data/threats';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const data: ThreatData = await request.json();

        // Basic validation
        if (!data.hasData || !data.threats || !data.metadata) {
            return NextResponse.json(
                { error: 'Invalid payload structure' },
                { status: 400 }
            );
        }

        const env = getRequestContext().env as unknown as CloudflareEnv;

        if (env.THREAT_FEED_KV) {
            await env.THREAT_FEED_KV.put('current_feed', JSON.stringify(data));
            console.log('Successfully wrote to Cloudflare KV: THREAT_FEED_KV');
        } else {
            console.warn('THREAT_FEED_KV binding not found. Mock/local environment assumed.');
        }

        return NextResponse.json(
            { message: 'Data accepted', count: data.threats.length },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing ingest webhook:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
