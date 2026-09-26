import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { UserProvider } from "@/context/UserContext";
import { FavoriteProvider } from "@/context/FavoriteContext";

export const metadata = {
  title: "User Directory Challenge",
  description: "Mini Challenge Tailwind CSS & shadcn/ui",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <UserProvider>
          <FavoriteProvider>
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </FavoriteProvider>
        </UserProvider>
      </body>
    </html>
  );
} 