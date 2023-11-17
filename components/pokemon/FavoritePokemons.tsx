import { FavoriteCardPokemon } from ".";

interface Props {
  pokemons: number[];
}

export const FavoritePokemons = ({ pokemons }: Props) => {
  return (
    <div className="mt-2 gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
      {pokemons.map((id) => (
        <FavoriteCardPokemon key={id} pokemonId={id}></FavoriteCardPokemon>
      ))}
    </div>
  );
};
