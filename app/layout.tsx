import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

// Import Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Keep Geist fonts (if needed for mono or special sections)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Famous Tours and Travels",
  description: "Explore Sri Lanka like never before!",
  icons: {
    icon: [{ url: "/Favicon.png", type: "image/png" }],
    shortcut: ["/Favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-poppins antialiased overflow-x-hidden max-w-full">
        {children}
      </body>
    </html>
  );
}
