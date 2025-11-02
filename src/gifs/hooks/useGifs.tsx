import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  //No se re-renderiza cuando el componete si
  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      console.log("Cache");
      setGifs(gifsCache.current[term]);
      return;
    }
    // console.log({ term });
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = async (query: string) => {
    query = query.trim().toLocaleLowerCase();
    if (query.length === 0) return;
    if (previousTerms.includes(query)) return;
    const currentTerms = previousTerms.slice(0, 6);
    currentTerms.unshift(query);

    setPreviousTerms(currentTerms);

    const gifs = await getGifsByQuery(query);

    setGifs(gifs);
    gifsCache.current[query] = gifs;
    // console.log({ gifs });
  };

  return {
    // Properties
    gifs,
    //Methods
    handleSearch,
    handleTermClicked,
    previousTerms,
  };
};
