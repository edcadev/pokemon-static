import { useEffect, useState } from "react";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";

import { Layout } from "@/components/layouts";
import { HeartIcon } from "@/components/icons/HeartIcon";

import type { Pokemon } from "@/interfaces";

import { confetti } from "@/lib";
import { getPokemonInfo, localFavorites } from "@/utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState<boolean>(false);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti();
  };

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
  }, [pokemon.id]);

  return (
    <Layout title={pokemon.name}>
      <div className="mt-2 flex flex-col justify-center gap-2 md:flex-row">
        <Card
          isHoverable
          className="w-full flex justify-center items-center md:max-w-[300px]"
        >
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

        <Card shadow="sm" isHoverable className="w-full max-w-max p-3">
          <CardHeader>
            <h1 className="font-bold uppercase text-3xl mr-auto">
              {pokemon.name}
            </h1>

            <Button
              isIconOnly
              color="danger"
              aria-label="Like"
              onClick={onToggleFavorite}
            >
              <HeartIcon filled={isInFavorites} />
            </Button>
          </CardHeader>

          <CardBody>
            <p className="text-xl">Sprites:</p>
            <div className="flex flex-row flex-wrap justify-center items-center">
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
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400, // 24H in seconds
  };
};

export default PokemonPage;
