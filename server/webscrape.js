import axios from 'axios';
import * as cheerio from 'cheerio';

//can call this into backend
export const movieIdContext = {
  inTheatre: [],
  mostPopular: []
};
//Scrape movies in theatres 
const inTheatreUrl = 'https://www.imdb.com/showtimes/cinema/US/ci0012098/?ref_=shlc_thtr';
async function scrapeInTheatreIds() {
  const response = await axios.get(inTheatreUrl, {
    //had to add headers due to content block
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
                    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                    'Chrome/115.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    },
  });

  const html = response.data;
  const $ = cheerio.load(html);
  //console.log(html);
//filtering data to scrape a href tags for imdb id
  const ids = new Set();
  $('a[href^="/showtimes/title/tt"]').each((_, el) => {
    const href = $(el).attr('href');
    const match = href.match(/tt\d+/);
    if (match) ids.add(match[0]);
  });

  return [...ids];
};
//Scrape popular movies
const popMovieUrl= `https://www.imdb.com/chart/top/?ref_=hm_nv_menu&sort=popularity%2Casc`;
async function scrapePopularMovie(){
  const response= await axios.get(popMovieUrl,{ headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
                    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                    'Chrome/115.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    },
  });
  const html = response.data;
  const $ = cheerio.load(html);
  
  //similar process as in theatre scrape just different href pattern
  const ids= new Set();
  $('a[href^="/title/tt"]').each((_,el)=>{
    const href= $(el).attr('href');
    const match = href.match(/tt\d+/);
    if (match) ids.add(match[0]);
  });
  return [...ids];
};
//retrieval function 
export async function scrapeAndStore() {
  const inTheatre = await scrapeInTheatreIds();
  movieIdContext.inTheatre = inTheatre;
  const mostPopular= await scrapePopularMovie();
  movieIdContext.mostPopular= mostPopular;
  console.log('In-theatre movie IDs updated:', inTheatre , 'Most popular movie IDs updated: ', mostPopular);
};
