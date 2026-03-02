import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { email, answer } = await req.json();
    if (!email || !answer) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'thevoiceofcash@gmail.com',
      subject: `New Guide Download: ${email}`,
      html: `
        <div style="font-family:sans-serif;background:#0A0A0A;color:#F5F0E8;padding:32px;max-width:520px;">
          <div style="color:#00C896;font-weight:800;font-size:18px;margin-bottom:24px;">New Guide Download</div>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Most important thing in the world to them:</strong></p>
          <blockquote style="border-left:3px solid #00C896;padding-left:16px;color:#aaa;margin:12px 0;">${answer}</blockquote>
          <hr style="border-color:#222;margin:24px 0;"/>
          <p style="font-size:12px;color:#555;">thevoiceofcash.com guide download</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Guide download error:', e);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
