import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/componentes/CustomHeader";
import { SearchBar } from "./shared/componentes/SearchBar";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState(["dragon ball z"]);
  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  const handleSearch = async (query: string) => {
    query = query.trim().toLocaleLowerCase();
    if (query.length === 0) return;
    if (previousTerms.includes(query)) return;
    const currentTerms = previousTerms.slice(0, 6);
    currentTerms.unshift(query);

    setPreviousTerms(currentTerms);

    const gifs = await getGifsByQuery(query);
    console.log({ gifs });

    setGifs(gifs);
  };

  return (
    <>
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el gif perfecto!!"
      />

      <SearchBar placeholder="Buscar Gif" onQuery={handleSearch} />

      <PreviousSearches
        title="Busquedas previas"
        searchesList={["Crash Bandicoot", "Resident Evil", "Gokú"]}
        onLabelClicked={handleTermClicked}
      />

      <GifList gifs={gifs} />
    </>
  );
};
