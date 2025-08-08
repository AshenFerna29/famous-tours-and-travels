import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';

interface BookingData {
  fullName: string;
  email: string;
  phone: string;
  package: string;
  guests: string;
  date: string;
  request: string;
}

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

function generateBookingPDF(bookingData: BookingData): Buffer {
  const doc = new jsPDF();
  
  // Add company logo/header
  doc.setFontSize(20);
  doc.setTextColor(253, 167, 32); // #fda720
  doc.text('Famous Tours & Travels', 20, 30);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Booking Confirmation', 20, 45);
  
  // Add booking details
  doc.setFontSize(12);
  
  const details = [
    `Full Name: ${bookingData.fullName}`,
    `Email: ${bookingData.email}`,
    `Phone: ${bookingData.phone}`,
    `Tour Package: ${bookingData.package}`,
    `Number of Guests: ${bookingData.guests}`,
    `Preferred Date: ${bookingData.date}`,
    `Special Requests: ${bookingData.request || 'None'}`,
  ];
  
  let yPosition = 65;
  details.forEach((detail) => {
    doc.text(detail, 20, yPosition);
    yPosition += 10;
  });
  
  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text('Thank you for choosing Famous Tours & Travels!', 20, yPosition + 20);
  doc.text('We will contact you within 24 hours to confirm your booking.', 20, yPosition + 30);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition + 40);
  
  return Buffer.from(doc.output('arraybuffer'));
}

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json();
    
    // Check if email credentials are configured
    const emailConfigured = process.env.EMAIL_USER && 
                           process.env.EMAIL_PASS && 
                           process.env.EMAIL_USER !== 'your-email@gmail.com';
    
    if (!emailConfigured) {
      // Test mode - just log the booking data
      console.log('📧 EMAIL TEST MODE - Booking data received:', bookingData);
      console.log('🔧 To enable real emails, configure EMAIL_USER and EMAIL_PASS in .env.local');
      
      return NextResponse.json(
        { 
          message: 'Booking received! (Email test mode - check console for details)',
          testMode: true 
        },
        { status: 200 }
      );
    }
    
    // Generate PDF
    const pdfBuffer = generateBookingPDF(bookingData);
    
    // Email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: bookingData.email,
      subject: 'Booking Confirmation - Famous Tours & Travels',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #fda720; color: white; padding: 20px; text-align: center;">
            <h1>Famous Tours & Travels</h1>
            <h2>Booking Confirmation</h2>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Dear ${bookingData.fullName},</p>
            
            <p>Thank you for your booking request! We have received your information and will contact you within 24 hours to confirm your booking details.</p>
            
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #fda720;">Booking Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Tour Package:</strong> ${bookingData.package}</li>
                <li><strong>Number of Guests:</strong> ${bookingData.guests}</li>
                <li><strong>Preferred Date:</strong> ${bookingData.date}</li>
                <li><strong>Phone:</strong> ${bookingData.phone}</li>
                ${bookingData.request ? `<li><strong>Special Requests:</strong> ${bookingData.request}</li>` : ''}
              </ul>
            </div>
            
            <p>Please find your booking confirmation attached as a PDF.</p>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br>
            Famous Tours & Travels Team</p>
          </div>
          
          <div style="background-color: #333; color: white; padding: 10px; text-align: center; font-size: 12px;">
            <p>&copy; 2025 Famous Tours & Travels. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `booking-confirmation-${bookingData.fullName.replace(/\s+/g, '-')}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };
    
    // Email to company (optional - for internal tracking)
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
      subject: `New Booking Request from ${bookingData.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Booking Request Received</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
            <h3>Customer Details:</h3>
            <ul>
              <li><strong>Name:</strong> ${bookingData.fullName}</li>
              <li><strong>Email:</strong> ${bookingData.email}</li>
              <li><strong>Phone:</strong> ${bookingData.phone}</li>
              <li><strong>Tour Package:</strong> ${bookingData.package}</li>
              <li><strong>Number of Guests:</strong> ${bookingData.guests}</li>
              <li><strong>Preferred Date:</strong> ${bookingData.date}</li>
              ${bookingData.request ? `<li><strong>Special Requests:</strong> ${bookingData.request}</li>` : ''}
            </ul>
          </div>
          
          <p><strong>Action Required:</strong> Please contact the customer within 24 hours to confirm the booking.</p>
        </div>
      `,
      attachments: [
        {
          filename: `booking-request-${bookingData.fullName.replace(/\s+/g, '-')}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };
    
    // Send emails
    try {
      await transporter.sendMail(customerMailOptions);
      await transporter.sendMail(companyMailOptions);
      
      return NextResponse.json(
        { message: 'Booking confirmation sent successfully!' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      
      // Return success but note email issue
      return NextResponse.json(
        { 
          message: 'Booking received! Email delivery failed - please check email configuration.',
          emailError: true 
        },
        { status: 200 }
      );
    }
    
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { message: 'Failed to process booking request' },
      { status: 500 }
    );
  }
}
