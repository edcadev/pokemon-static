import { ReactNode } from "react";
import Head from "next/head";
import { Navbar } from "../ui";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  children: ReactNode;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title || "PokemonApp"}</title>
        <meta name="author" content="Eduardo Cabanillas" />
        <meta
          name="description"
          content={`Información sobre el Pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta
          property="og:description"
          content={`Esta el la página sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/images/banner.png`} />
        <meta property="og:image" content="/images/banner.png" />
      </Head>

      <Navbar />

      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
