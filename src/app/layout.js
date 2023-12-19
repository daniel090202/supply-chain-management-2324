"use client";

import { Inter } from "next/font/google";
import { NavBar, Footer } from "../../components";
import { TrackingProvider } from "../../context/Tracking";

const inter = Inter({ subsets: ["latin"] });

export const metaData = {
  title: "Sling Academy",
  description:
    "This is a meta description. Welcome to slingacademy.com. Happy coding and have a nice day",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <TrackingProvider>
          <NavBar />
          {children}
          <Footer />
        </TrackingProvider>
      </body>
    </html>
  );
}
