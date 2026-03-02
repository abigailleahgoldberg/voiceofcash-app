import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const CORRECT = '1234!';
const COOKIE  = 'voccord_auth';

export async function POST(req: Request) {
  const { password } = await req.json();
  if (password === CORRECT) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE, 'granted', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/voccord',
      maxAge: 60 * 60 * 8,
    });
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}

export async function GET() {
  const jar = await cookies();
  const ok  = jar.get(COOKIE)?.value === 'granted';
  return NextResponse.json({ ok });
}
