import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import { type MovieDetails } from './movies';
import { useMovieContext } from './MovieContext';
import './App.css';

function SingleMovie() {
  const { id } = useParams<{ id: string }>(); // Extract :id from URL
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { searchQuery, setSearchQuery } = useMovieContext();
  const API_KEY = import.meta.env.VITE_API;

  useEffect(() => {
    if (id) {
      // Fetch movie details using the extracted ID
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.Response === 'False') {
            setError(data.Error || 'Movie not found');
          } else {
            setMovieDetails(data);
          }
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch movie details');
          setLoading(false);
        });
    }
  }, [id, API_KEY]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movieDetails) return <div>Movie not found</div>;

  return (
    <div className="wrapper">
      <div className="nav_header">
        <Link to={'/'}><h1>Movie Viewer OMDB</h1></Link>
        <div className="search-area">
          <input 
            type="text"
            placeholder='Search Movie Name'
            className='search_input' 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link to={`/search/?q=${encodeURIComponent(searchQuery)}`}>
            <button className='confirm' disabled={!searchQuery.trim()}>Confirm</button>
          </Link>
        </div>
      </div>
      
      <div className="movies_outline">
        <h1>{movieDetails.Title} ({movieDetails.Year})</h1>
        <img src={movieDetails.Poster} alt={`${movieDetails.Title} poster`} />
        <h2>Plot</h2>
        <strong><h3>{movieDetails.Plot}</h3></strong>
        <h2>Director</h2>
        <h3>{movieDetails.Director}</h3>
        <h2>Actors</h2>
        <strong><p>{movieDetails.Actors}</p></strong>
        <h3><strong>Rating:</strong> {movieDetails.imdbRating}</h3>
        <Link to="/">
          <button className='confirm'>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default SingleMovie;