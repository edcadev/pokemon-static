import Image from "next/image";

export const NoFavorites = () => {
  return (
    <div className=" h-[calc(100vh-70px)] flex flex-col items-center justify-center self-center gap-5">
      <h1 className=" text-3xl font-bold">No hay favoritos</h1>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
        alt="Pokemon Ditto"
        width={250}
        height={250}
        className="opacity-10"
      />
    </div>
  );
};
