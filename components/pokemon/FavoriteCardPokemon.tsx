import { Card, CardBody, Image } from "@nextui-org/react";
import { useRouter } from "next/router";

interface Props {
  pokemonId: number;
}

export const FavoriteCardPokemon = ({ pokemonId }: Props) => {
  const router = useRouter();

  const onPress = () => {
    router.push(`/pokemon/${pokemonId}`);
  };

  return (
    <Card isHoverable isPressable shadow="sm" onPress={onPress}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          alt="Pokemon favorito"
          className="w-full p-2 h-[140px] md:h-[200px] lg:h-[240px]"
        />
      </CardBody>
    </Card>
  );
};
3;
