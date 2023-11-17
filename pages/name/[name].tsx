import { useEffect, useState } from "react";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";

import { Layout } from "@/components/layouts";
import { HeartIcon } from "@/components/icons/HeartIcon";

import type { Pokemon, PokemonListResponse } from "@/interfaces";

import { confetti } from "@/lib";
import { getPokemonInfo, localFavorites } from "@/utils";
import { pokeApi } from "@/api";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
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
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);
  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
    revalidate: 86400, // 24H in seconds
  };
};

export default PokemonByNamePage;
