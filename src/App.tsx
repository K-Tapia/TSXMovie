import {useEffect} from 'react';
import { useMovieContext } from './MovieContext';
import './App.css';

function App() {
const baseUrl=import.meta.env.VITE_BACKEND_URL;
console.log(baseUrl);

 const { movies,setMovies, searchQuery, setSearchQuery } = useMovieContext();
useEffect(()=>{
   // Fetch in-theatre movies
  fetch(`${baseUrl}/movies/in-theatre`)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(console.error);
},[])
  return (
    <>
      <div className='wrapper'>
      <div className= "nav_header">
        <h1>Movie Viewer OMDB</h1>
        <input type="text"placeholder='Search Movie Name'
        className='search_input' value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
      </div>
     <div className="movies_outline">
       <h2>Popular Movies</h2>
       <div className="movies_list"> 
        {/**CHANGE once api is implemented */}
          {movies.map((movie) => (
            <div key={movie.imdbID} className='movies'>
              <h3>{movie.Title} ({movie.Year})</h3>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
            </div>
          ))}
          </div>
        </div>
        
      <div className="movies_outline">
       <h2>In Theatres</h2>
       <div className="movies_list"> 
          {movies.map((movie) => (
            <div key={movie.imdbID} className='movies'>
              <h3>{movie.Title} ({movie.Year})</h3>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
