import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

const DATA_PATH = join(process.cwd(), 'data', 'signatures.json');

function getIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

export async function POST(req: NextRequest) {
  try {
    const { memberId, memberName, memberTitle, typedName } = await req.json();

    if (!memberId || !memberName || !typedName) {
      return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
    }

    // Read existing signatures
    let signatures: any[] = [];
    try { signatures = JSON.parse(readFileSync(DATA_PATH, 'utf8')); } catch {}

    // Check if already signed
    if (signatures.find((s: any) => s.memberId === memberId)) {
      return NextResponse.json({ ok: false, error: 'This partner has already signed.' }, { status: 409 });
    }

    const ip = getIP(req);
    const ua = req.headers.get('user-agent') || 'unknown';
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'full', timeStyle: 'long' });
    const signatureId = `VOC-SIG-${randomUUID().toUpperCase().slice(0, 8)}`;

    const record = {
      signatureId,
      memberId,
      memberName,
      memberTitle,
      typedName,
      ip,
      userAgent: ua,
      timestamp,
      timestampISO: new Date().toISOString(),
    };

    signatures.push(record);
    writeFileSync(DATA_PATH, JSON.stringify(signatures, null, 2));

    return NextResponse.json({ ok: true, signatureId, memberName, timestamp, ip });
  } catch (err) {
    console.error('sign-contract error:', err);
    return NextResponse.json({ ok: false, error: 'Server error. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const signatures = JSON.parse(readFileSync(DATA_PATH, 'utf8'));
    return NextResponse.json({ signatures });
  } catch {
    return NextResponse.json({ signatures: [] });
  }
}
