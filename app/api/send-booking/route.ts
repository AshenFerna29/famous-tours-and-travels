import { NextRequest, NextResponse } from 'next/server';
import { getTransporter, fromHeader } from '@/lib/mail';

export const runtime = 'nodejs'; // ensure Node runtime (good for Nodemailer)

interface BookingData {
  fullName: string;
  email: string;     // customer's email typed in the form
  phone: string;
  package: string;
  guests: string;
  date: string;
  request: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const booking: BookingData = body;

    // Basic validation (avoid empty emails)
    if (
      !booking.fullName ||
      !booking.email ||
      !booking.phone ||
      !booking.package ||
      !booking.guests ||
      !booking.date
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = getTransporter();

    // Send ONE email to your inbox with all booking details.
    // Use Reply-To so you can reply directly to the customer.
    await transporter.sendMail({
      from: fromHeader(),
      to: process.env.EMAIL_TO!,
      replyTo: booking.email, // reply goes to the customer
      subject: `New Booking — ${booking.fullName} (${booking.package}, ${booking.date})`,
      html: `
        <div style="font-family:Arial, Helvetica, sans-serif;max-width:640px;margin:auto;">
          <div style="background:#fda720;color:#fff;padding:16px 20px;border-radius:8px 8px 0 0;">
            <h2 style="margin:0;">New Booking Request</h2>
          </div>
          <div style="border:1px solid #eee;border-top:0;padding:20px;border-radius:0 0 8px 8px;">
            <p><strong>Name:</strong> ${escapeHTML(booking.fullName)}</p>
            <p><strong>Email:</strong> ${escapeHTML(booking.email)}</p>
            <p><strong>Phone:</strong> ${escapeHTML(booking.phone)}</p>
            <p><strong>Tour Package:</strong> ${escapeHTML(booking.package)}</p>
            <p><strong>Guests:</strong> ${escapeHTML(booking.guests)}</p>
            <p><strong>Preferred Date:</strong> ${escapeHTML(booking.date)}</p>
            ${booking.request ? `<p><strong>Special Requests:</strong> ${escapeHTML(booking.request)}</p>` : ''}
          </div>
        </div>
      `,
      text: [
        `New Booking Request`,
        `Name: ${booking.fullName}`,
        `Email: ${booking.email}`,
        `Phone: ${booking.phone}`,
        `Tour Package: ${booking.package}`,
        `Guests: ${booking.guests}`,
        `Preferred Date: ${booking.date}`,
        booking.request ? `Special Requests: ${booking.request}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return NextResponse.json({ success: true, message: 'Booking delivered to your inbox.' });
  } catch (err: unknown) {
    console.error('send-booking error:', err);
    return NextResponse.json({ error: 'Failed to send booking' }, { status: 500 });
  }
}

/** very small HTML escaper for safety */
function escapeHTML(input: string) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
