import { NextRequest, NextResponse } from 'next/server';
import { autoIndexContent } from '@/lib/indexing';

export async function POST(req: NextRequest) {
  try {
    const { slug, type } = await req.json();

    if (!slug || !type || !['project', 'blog'].includes(type)) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }

    // Fire-and-forget; don't block the admin UI on Google's response
    autoIndexContent(slug, type).catch(err => console.error('[Indexing] failed:', err));

    return NextResponse.json({ success: true, message: 'Indexing triggered' });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to trigger indexing' }, { status: 500 });
  }
}
