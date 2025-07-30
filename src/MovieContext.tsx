// MovieContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from "react";
import { type QueryMovie } from "./movies"; 

interface MovieContextType {
  movies: QueryMovie[];
  setMovies: React.Dispatch<React.SetStateAction<QueryMovie[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<QueryMovie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <MovieContext.Provider value={{ movies, setMovies, searchQuery, setSearchQuery }}>
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
