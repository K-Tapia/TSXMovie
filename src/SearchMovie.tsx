import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { useMovieContext } from './MovieContext';
import { type QueryMovie } from './movies';
import './App.css';

function SearchMovie() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<QueryMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|string>(null);
  
  const { searchQuery, setSearchQuery } = useMovieContext();
  
  const query = searchParams.get('q') || '';
  const API_KEY = import.meta.env.VITE_API;

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);
      
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        .then(res => res.json())
        .then(data => {
          if (data.Response === 'False') {
            setError(data.Error || 'No results found');
            setMovies([]);
          } else {
            setMovies(data.Search || []);
          }
          setLoading(false);
        })
        .catch(err => {
          setError('Search failed');
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className='wrapper-wide'>
      <div className= "nav_header">
        <Link to={'/'}><h1>Movie Viewer OMDB</h1></Link>
       <div className="search-area">
         <input type="text"placeholder='Search Movie Name'
        className='search_input' value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
            <Link to={`/search/?q=${encodeURIComponent(searchQuery)}`}>
             <button className='confirm' disabled={!searchQuery.trim()}>Confirm</button>
            </Link>
       </div>
       </div>

      <div className="movies_outline">
        <h2>Search Results for: "{query}"</h2>
        {loading && <div>Loading...</div>}
        {error && <div style={{color: 'red'}}>{error}</div>}
        
        <div className="movies_listV">
          {movies.map((movie) => (
            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
              <div className='movies'>
                <h3>{movie.Title} ({movie.Year})</h3>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchMovie;