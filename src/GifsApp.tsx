import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/componentes/CustomHeader";
import { SearchBar } from "./shared/componentes/SearchBar";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { handleSearch, handleTermClicked, previousTerms, gifs } = useGifs();

  return (
    <>
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el gif perfecto!!"
      />

      <SearchBar placeholder="Buscar Gif" onQuery={handleSearch} />

      <PreviousSearches
        title="Busquedas previas"
        searchesList={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      <GifList gifs={gifs} />
    </>
  );
};
