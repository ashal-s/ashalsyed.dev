import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://AshalSyed.dev"),
  title: "Ashal Syed   Software Engineer",
  description:
    "Portfolio of Ashal Syed, a Melbourne-based software engineer with experience across full-stack products and enterprise platform delivery, including GraphOrg.",
  openGraph: {
    title: "Ashal Syed   Software Engineer",
    description:
      "Full-stack products, enterprise platforms, and AI-backed features, from requirements through deployment.",
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
