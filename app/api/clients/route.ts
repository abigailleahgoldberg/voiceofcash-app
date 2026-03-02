import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

const DATA_PATH = join(process.cwd(), 'data', 'clients.json');

function load() {
  try { return JSON.parse(readFileSync(DATA_PATH, 'utf8')); } catch { return []; }
}

export async function GET() {
  return NextResponse.json({ clients: load() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const clients = load();
    const record = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...body,
    };
    clients.push(record);
    writeFileSync(DATA_PATH, JSON.stringify(clients, null, 2));
    return NextResponse.json({ ok: true, client: record });
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to save client.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const clients = load().filter((c: any) => c.id !== id);
    writeFileSync(DATA_PATH, JSON.stringify(clients, null, 2));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to delete.' }, { status: 500 });
  }
}
