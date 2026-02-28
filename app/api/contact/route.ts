import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0E8; padding: 40px;">
      <h1 style="font-size: 28px; color: #D4A843; margin-bottom: 8px;">New Consultation Request</h1>
      <p style="color: #888; margin-bottom: 32px; font-size: 14px;">Submitted via thevoiceofcash.com</p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px; width: 40%;">Full Name</td><td style="padding: 12px 0; border-bottom: 1px solid #222; font-size: 15px;">${data.name}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Business Name</td><td style="padding: 12px 0; border-bottom: 1px solid #222; font-size: 15px;">${data.businessName}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #222; font-size: 15px;">${data.email}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid #222; font-size: 15px;">${data.phone}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Business Type</td><td style="padding: 12px 0; border-bottom: 1px solid #222; font-size: 15px;">${data.businessType}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Team Size</td><td style="padding: 12px 0; border-bottom: 1px solid #222; font-size: 15px;">${data.teamSize}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Biggest Challenges</td><td style="padding: 12px 0; border-bottom: 1px solid #222; font-size: 15px;">${Array.isArray(data.challenges) ? data.challenges.join(", ") : data.challenges}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Prior AI Experience</td><td style="padding: 12px 0; border-bottom: 1px solid #222; font-size: 15px;">${data.priorAI}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Monthly Budget</td><td style="padding: 12px 0; border-bottom: 1px solid #222; font-size: 15px;">${data.budget}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Timeline</td><td style="padding: 12px 0; border-bottom: 1px solid #222; font-size: 15px;">${data.timeline}</td></tr>
        <tr><td style="padding: 12px 0; color: #888; font-size: 13px; vertical-align: top;">First Automation Goal</td><td style="padding: 12px 0; font-size: 15px;">${data.goal}</td></tr>
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: `"Voice of Cash Website" <${process.env.EMAIL_USER}>`,
    to: "thevoiceofcash@gmail.com",
    replyTo: data.email,
    subject: `New Consultation: ${data.name} — ${data.businessName}`,
    html,
  });

  return NextResponse.json({ ok: true });
}
