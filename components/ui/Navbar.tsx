import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-full py-0 px-5 flex justify-between items-center gap-2 bg-gray-900">
      <Link href="/" className="w-full flex items-center">
        <Image
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          }
          alt="Icono de la app"
          width={70}
          height={70}
          priority
        />
        <div>
          <span className="text-2xl font-bold">P</span>
          <span className="text-xl font-semibold">okemon</span>
        </div>
      </Link>

      <Link href={"/favoritos"}>Favoritos</Link>
    </div>
  );
};
