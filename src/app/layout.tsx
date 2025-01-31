import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/notion.css";
import Header from "@/components/Header";
import cn from "classnames";
import Footer from "@/components/Footer";
import loadLocale from "../../assets/i18n";
import { ConfigProvider } from "@/lib/config";
import { LocaleProvider } from "@/lib/locale";
import { ThemeProvider } from "@/lib/theme";
import { getBlogConfig } from "@/lib/server/config";
import Layout from "@/components/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: Add OG metadata here as well
export const generateMetadata = (): Metadata => {
  const blogConfig = getBlogConfig(); // Load config on server side

  return {
    title: "Website Title",
    description: "Website description",
    robots: {
      follow: true,
      index: true,
    },
    other: {
      "google-site-verification": blogConfig.googleSiteVerification,
    },
    openGraph: {
      locale: blogConfig.lang,
    },
    keywords: blogConfig.seo.keywords.join(", "),
    icons: {
      icon: [
        {
          media: "(prefers-color-scheme: light)",
          url: "/favicon.png",
          href: "/favicon.png",
        },
        {
          media: "(prefers-color-scheme: dark)",
          url: "/favicon.dark.png",
          href: "/favicon.dark.png",
        },
      ],
    },
  };
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await loadLocale("basic", "en-US");
  const blogConfig = getBlogConfig(); // Load config on server side
  const parrams = await params;
  const layout = Boolean(parrams.slug) ? "blog" : "";
  const fullWidth = false;
  console.log("<<inside root layout>>", layout);

  return (
    <html lang="en">
      <body
        className={cn(
          "bg-day dark:bg-night",
          `${geistSans.variable} ${geistMono.variable} antialiased`
        )}
      >
        <div
          className={`wrapper ${
            blogConfig.font === "serif" ? "font-serif" : "font-sans"
          }`}
        >
          <ConfigProvider value={blogConfig}>
            <LocaleProvider value={locale}>
              <ThemeProvider>
                <Layout>{children}</Layout>
                {/* <Header />
                <main
                  className={cn(
                    "flex-grow transition-all",
                    layout !== "blog" && [
                      "self-center px-4",
                      fullWidth ? "md:px-24" : "w-full max-w-2xl",
                    ]
                  )}
                >
                  {children}
                </main>
                <Footer /> */}
              </ThemeProvider>
            </LocaleProvider>
          </ConfigProvider>
        </div>
      </body>
    </html>
  );
}
