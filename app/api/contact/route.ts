import { NextRequest, NextResponse } from 'next/server';
import { getTransporter, fromHeader } from '@/lib/mail';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const transporter = getTransporter();

    // Send ONE email to your inbox; use Reply-To so you can reply to the visitor
    await transporter.sendMail({
      from: fromHeader(),                    // e.g. "Famous Tours & Travels <info@famoustoursandtravels.com>"
      to: process.env.EMAIL_TO!,             // your destination inbox (info@...)
      replyTo: email,                        // reply goes to the visitor
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:auto;">
          <div style="background:#fda720;color:#fff;padding:16px 20px;border-radius:8px 8px 0 0;">
            <h2 style="margin:0;">New Contact Message</h2>
          </div>
          <div style="border:1px solid #eee;border-top:0;padding:20px;border-radius:0 0 8px 8px;">
            <p><strong>Name:</strong> ${escapeHTML(name)}</p>
            <p><strong>Email:</strong> ${escapeHTML(email)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space:pre-wrap">${escapeHTML(message)}</p>
          </div>
        </div>
      `,
      text: [
        `New Contact Message`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Message:`,
        message,
      ].join('\n'),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

/** tiny HTML escaper */
function escapeHTML(input: string) {
  return String(input).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
