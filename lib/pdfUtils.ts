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

export const generateBookingPDF = (bookingData: BookingData): jsPDF => {
  const doc = new jsPDF();
  
  // Set up colors
  const primaryColor: [number, number, number] = [253, 167, 32]; // #fda720
  const blackColor: [number, number, number] = [0, 0, 0];
  const grayColor: [number, number, number] = [128, 128, 128];
  
  // Header
  doc.setFontSize(24);
  doc.setTextColor(...primaryColor);
  doc.text('Famous Tours & Travels', 20, 30);
  
  doc.setFontSize(18);
  doc.setTextColor(...blackColor);
  doc.text('Booking Confirmation', 20, 45);
  
  // Booking reference
  const bookingRef = `FTT-${Date.now().toString().slice(-6)}`;
  doc.setFontSize(12);
  doc.setTextColor(...grayColor);
  doc.text(`Booking Reference: ${bookingRef}`, 20, 55);
  
  // Customer details section
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.text('Customer Information', 20, 75);
  
  doc.setFontSize(11);
  doc.setTextColor(...blackColor);
  
  const customerDetails = [
    `Full Name: ${bookingData.fullName}`,
    `Email Address: ${bookingData.email}`,
    `Phone Number: ${bookingData.phone}`,
  ];
  
  let yPos = 85;
  customerDetails.forEach((detail) => {
    doc.text(detail, 25, yPos);
    yPos += 8;
  });
  
  // Booking details section
  yPos += 10;
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.text('Booking Details', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(11);
  doc.setTextColor(...blackColor);
  
  const bookingDetails = [
    `Tour Package: ${getPackageFullName(bookingData.package)}`,
    `Number of Guests: ${bookingData.guests}`,
    `Preferred Date: ${new Date(bookingData.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`,
  ];
  
  bookingDetails.forEach((detail) => {
    doc.text(detail, 25, yPos);
    yPos += 8;
  });
  
  // Special requests section (if any)
  if (bookingData.request && bookingData.request.trim()) {
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text('Special Requests', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setTextColor(...blackColor);
    
    // Split long text into multiple lines
    const splitRequest = doc.splitTextToSize(bookingData.request, 160);
    doc.text(splitRequest, 25, yPos);
    yPos += splitRequest.length * 6;
  }
  
  // Important information box
  yPos += 20;
  doc.setFillColor(249, 249, 249);
  doc.rect(20, yPos - 5, 170, 35, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text('Important Information', 25, yPos + 5);
  
  doc.setFontSize(10);
  doc.setTextColor(...blackColor);
  const importantInfo = [
    '• This is a booking confirmation. Final details will be provided upon confirmation.',
    '• We will contact you within 24 hours to confirm your booking.',
    '• Please keep this document for your records.',
  ];
  
  let infoYPos = yPos + 12;
  importantInfo.forEach((info) => {
    doc.text(info, 25, infoYPos);
    infoYPos += 6;
  });
  
  // Footer
  yPos += 60;
  doc.setFontSize(10);
  doc.setTextColor(...grayColor);
  doc.text('Thank you for choosing Famous Tours & Travels!', 20, yPos);
  doc.text('For inquiries, contact us at info@famoustours.lk | +94 11 234 5678', 20, yPos + 8);
  doc.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, yPos + 16);
  
  return doc;
};

const getPackageFullName = (packageCode: string): string => {
  const packages: Record<string, string> = {
    adventure: 'Hill Country Adventure',
    romance: 'Ceylon Romance',
    ancient: 'Ancient Ceylon',
    wellness: 'Tranquil Escape',
    wildlife: 'Wild Lanka',
    budget: 'Ceylon On a Budget',
    luxary: 'Luxury Island Lanka',
    eco: 'Eco Ceylon',
    family: 'Family Fun in Sri Lanka',
  };
  
  return packages[packageCode] || packageCode;
};

export const downloadPDF = (doc: jsPDF, filename: string) => {
  doc.save(filename);
};
