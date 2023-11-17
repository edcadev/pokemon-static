import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <Component {...pageProps} />
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
}
