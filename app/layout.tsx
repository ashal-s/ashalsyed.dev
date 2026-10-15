import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://AshalSyed.dev"),
  title: "Ashal Syed   Software Engineer",
  description:
    "Portfolio of Ashal Syed, a Melbourne-based software engineer building full-stack products end to end, including GraphOrg and Mafia Minds.",
  openGraph: {
    title: "Ashal Syed   Software Engineer",
    description:
      "Building full-stack products end to end: frontend, backend, databases, infrastructure and testing.",
    url: "https://AshalSyed.dev",
    siteName: "AshalSyed.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
