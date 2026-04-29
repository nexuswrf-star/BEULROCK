import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beulrock Executor — Execute Scripts with Power & Precision",
  description:
    "Execute scripts on your game servers with unmatched power, security, and precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-beulrock-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}