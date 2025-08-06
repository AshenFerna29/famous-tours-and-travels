# Famous Tours & Travels

A modern Next.js web application for a Sri Lankan tour company featuring comprehensive booking functionality with automated email confirmations and PDF generation.

## Features

- 🌴 **Tour Packages**: Multiple tour packages showcasing Sri Lankan destinations
- 📝 **Smart Booking Form**: Advanced form validation with real-time feedback
- 📧 **Email Automation**: Automatic booking confirmation emails with PDF attachments
- 📄 **PDF Generation**: Professional booking confirmation PDFs
- 🎨 **Modern UI**: Responsive design with Tailwind CSS
- ✅ **Form Validation**: Comprehensive client-side validation

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Email**: Nodemailer
- **PDF**: jsPDF
- **Images**: Next.js Image optimization

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
COMPANY_EMAIL=bookings@famoustours.lk
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Email Configuration

The application supports automated email confirmations. See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed setup instructions.

### Quick Gmail Setup:

1. Enable 2-factor authentication
2. Generate an app password
3. Add credentials to `.env.local`

## Booking Process

1. **User fills booking form** with validation
2. **Form submission** triggers API call
3. **PDF generation** creates booking confirmation
4. **Email sent** to customer and company
5. **Success notification** shows completion
6. **PDF downloads** automatically

## Project Structure

```
├── app/
│   ├── api/send-booking/     # Email API endpoint
│   ├── booking/              # Booking page
│   └── ...
├── components/
│   ├── TourBookingForm.tsx   # Main booking form
│   ├── SuccessNotification.tsx
│   └── ...
├── lib/
│   └── pdfUtils.ts          # PDF generation utilities
└── public/images/           # Static assets
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
