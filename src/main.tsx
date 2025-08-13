import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router';
import './index.css'
import App from './App.tsx'
import SearchMovie from './SearchMovie.tsx'
import { MovieProvider } from "./MovieContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     <MovieProvider>
       <Routes>
          <Route path="/" element={<App />} />
           <Route path="/search/" element={<SearchMovie />} />
       </Routes>
      </MovieProvider>
    </BrowserRouter>
    
   
  </StrictMode>,
)
