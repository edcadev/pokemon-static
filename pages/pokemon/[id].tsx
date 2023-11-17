import pokeApi from "@/api/pokeApi";
import { Layout } from "@/components/layouts";
import { Pokemon } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useState } from "react";
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 0.8,
        y: 0.04,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <div className="mt-2 flex gap-2 justify-center">
        <Card isHoverable className="relative">
          <Image
            radius="lg"
            alt={pokemon.name}
            src={
              pokemon.sprites.other?.dream_world.front_default ||
              "/no-image.png"
            }
            className="w-full p-5"
          />
        </Card>

        <Card shadow="sm" isHoverable className="p-3">
          <CardHeader className="flex justify-between">
            <h1 className="font-bold uppercase text-3xl">{pokemon.name}</h1>

            <Button
              radius="sm"
              variant={isInFavorites ? "ghost" : "solid"}
              onClick={onToggleFavorite}
              className="w-[200px] hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500 text-white shadow-lg"
            >
              {isInFavorites ? "En favoritos" : "Guardar en favoritos"}
            </Button>
          </CardHeader>

          <CardBody>
            <p className="text-xl">Sprites:</p>
            <div className="flex flex-row">
              <Image
                radius="lg"
                isZoomed
                width={150}
                height={150}
                alt={pokemon.name}
                src={pokemon.sprites.front_default}
              />
              <Image
                radius="lg"
                isZoomed
                width={150}
                height={150}
                alt={pokemon.name}
                src={pokemon.sprites.back_default}
              />
              <Image
                radius="lg"
                isZoomed
                width={150}
                height={150}
                alt={pokemon.name}
                src={pokemon.sprites.front_shiny}
              />
              <Image
                radius="lg"
                isZoomed
                width={150}
                height={150}
                alt={pokemon.name}
                src={pokemon.sprites.back_shiny}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      pokemon: await getPokemonInfo(id),
    },
  };
};

export default PokemonPage;
