"use client";

import { NavBar, Footer } from "../../components";
import { TrackingProvider } from "../../context/Tracking";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <TrackingProvider>
          <NavBar />
          {children}
          <Footer />
        </TrackingProvider>
      </body>
    </html>
  );
}
