import {useEffect} from 'react';
import { useMovieContext } from './MovieContext';
import './App.css';
import { Link } from 'react-router';
function App() {
const baseUrl=import.meta.env.VITE_BACKEND_URL;
console.log(baseUrl);

 const { inTheatreMovies,setInTheatreMovies,popularMovies,setPopularMovies, searchQuery, setSearchQuery } = useMovieContext();
useEffect(()=>{
   // Fetch in-theatre movies
  fetch(`${baseUrl}/movies/in-theatre`)
      .then(res => res.json())
      .then(data => setInTheatreMovies(data))
      .catch(console.error);
  fetch(`${baseUrl}/movies/popular`)
      .then (res=>res.json())
      .then(data=>setPopularMovies(data))
      .catch(console.error)
},[])
  return (
    <>
      <div className='wrapper'>
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
       <h2>Popular Movies</h2>
       <div className="movies_list"> 
        {/**CHANGE once api is implemented */}
          {popularMovies.map((movie) => (
            <Link to={`/movie/${movie.imdbID}`} ><div key={movie.imdbID} className='movies'>
              <h3>{movie.Title} ({movie.Year})</h3>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
            </div></Link>
          ))}
          </div>
        </div>
        
      <div className="movies_outline">
       <h2>In Theatres</h2>
       <div className="movies_list"> 
          {inTheatreMovies.map((movie) => (
            <Link to={`/movie/${movie.imdbID}`}><div key={movie.imdbID} className='movies'>
              <h3>{movie.Title} ({movie.Year})</h3>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
            </div></Link>
          ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
