import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import nodemailer from 'nodemailer';

const FILE = join(process.cwd(), 'data', 'agent-questions.json');

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, answers } = body;

  // Save to file
  const existing = existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : [];
  existing.push({ name, email, answers, submittedAt: new Date().toISOString(), id: crypto.randomUUID() });
  writeFileSync(FILE, JSON.stringify(existing, null, 2));

  // Email notification
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const answerLines = Object.entries(answers)
      .map(([id, val]) => `Q${id}: ${val}`)
      .join('\n\n');

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'thevoiceofcash@gmail.com',
      subject: `Agent Soul Intake — ${name}`,
      text: `New agent questionnaire submitted.\n\nName: ${name}\nEmail: ${email}\n\n---\n\n${answerLines}`,
    });

    // Confirmation to client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your Agent Soul Questionnaire — Voice of Cash',
      text: `${name},\n\nWe have everything we need to start building your agent.\n\nOur team will review your responses and reach out within one business day to confirm details before we begin.\n\nIf you have anything to add before we talk, reply to this email.\n\n— The Voice of Cash Team\nhttps://thevoiceofcash.com`,
    });
  } catch (_) {}

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const data = existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : [];
  return NextResponse.json(data);
}
