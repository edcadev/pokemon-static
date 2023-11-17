import { FavoriteCardPokemon } from ".";

interface Props {
  pokemons: number[];
}

export const FavoritePokemons = ({ pokemons }: Props) => {
  return (
    <div className="mt-2 gap-2 grid grid-cols-2 md:grid-cols-4">
      {pokemons.map((id) => (
        <FavoriteCardPokemon key={id} pokemonId={id}></FavoriteCardPokemon>
      ))}
    </div>
  );
};
