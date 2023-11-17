import { SmallPokemon } from "@/interfaces";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/router";

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const router = useRouter();

  const onPress = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <Card
      key={pokemon.id}
      isHoverable
      isPressable
      shadow="sm"
      onPress={onPress}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          src={pokemon.img}
          alt={pokemon.name}
          className="w-full h-[140px] md:h-[200px] lg:h-[240px]"
        />
      </CardBody>
      <CardFooter className="text-small justify-center">
        <b className="uppercase">{pokemon.name}</b>
      </CardFooter>
    </Card>
  );
};
