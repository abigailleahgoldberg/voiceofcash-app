import { NextResponse } from 'next/server';

const SITE_NAME = 'The Voice of Cash';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, businessName, phone, businessType, teamSize, challenges, priorAI, budget, timeline, goal } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
    }

    const brevoKey = process.env.BREVO_API_KEY;
    if (!brevoKey) {
      console.error('BREVO_API_KEY not set');
      return NextResponse.json({ ok: true, success: true });
    }

    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': brevoKey,
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name, SOURCE: SITE_NAME },
        listIds: [3],
        updateEnabled: true,
      }),
    });

    const msgContent = message || goal || 'Consultation request';
    const businessInfo = businessName ? '<p><strong>Business:</strong> ' + businessName + '</p>' : '';
    const phoneInfo = phone ? '<p><strong>Phone:</strong> ' + phone + '</p>' : '';
    const budgetInfo = budget ? '<p><strong>Budget:</strong> ' + budget + '</p>' : '';
    const timelineInfo = timeline ? '<p><strong>Timeline:</strong> ' + timeline + '</p>' : '';

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': brevoKey,
      },
      body: JSON.stringify({
        sender: { name: SITE_NAME, email: 'abigailleahgoldberg@gmail.com' },
        to: [{ email: 'thevoiceofcash@gmail.com', name: 'The Voice of Cash' }],
        subject: '[' + SITE_NAME + '] New inquiry from ' + name,
        htmlContent: '<h2>New Contact Form Submission</h2>' +
          '<p><strong>Source:</strong> ' + SITE_NAME + '</p>' +
          '<p><strong>Name:</strong> ' + name + '</p>' +
          '<p><strong>Email:</strong> ' + email + '</p>' +
          businessInfo +
          phoneInfo +
          budgetInfo +
          timelineInfo +
          '<p><strong>Message:</strong></p>' +
          '<p>' + msgContent + '</p>' +
          '<hr><p style="color:#888;font-size:12px;">Sent from ' + SITE_NAME + ' contact form</p>',
      }),
    });

    return NextResponse.json({ ok: true, success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
