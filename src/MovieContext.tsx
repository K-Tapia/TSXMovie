// MovieContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from "react";
import { type QueryMovie, dummyMovies } from "./movies"; 

interface MovieContextType {
  inTheatreMovies: QueryMovie[];
  setInTheatreMovies: React.Dispatch<React.SetStateAction<QueryMovie[]>>;
  popularMovies: QueryMovie[];
  setPopularMovies: React.Dispatch<React.SetStateAction<QueryMovie[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [inTheatreMovies, setInTheatreMovies] = useState<QueryMovie[]>(dummyMovies);//initialize with dummy data, incase webscrape fails
   const [popularMovies, setPopularMovies] = useState<QueryMovie[]>(dummyMovies);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <MovieContext.Provider value={{ inTheatreMovies, setInTheatreMovies,popularMovies,setPopularMovies, searchQuery, setSearchQuery }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
