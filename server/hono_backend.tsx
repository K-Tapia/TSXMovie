import {Hono} from "hono";
import {cors} from "hono/cors";
import {serve} from "@hono/node-server"
import axios from "axios";
import { movieIdContext,scrapeAndStore} from "./webscrape.js";
const apiKey= process.env.API_KEY
//hono server/api fetching
const app =new Hono();
app.use(cors());
app.get("/", (c)=>{
    return c.text("hello");
    
}) ;
// Get info for all in-theatre movies from context
app.get("/movies/in-theatre", async (c) => {
  try {
    const movies = await Promise.all(
      movieIdContext.inTheatre.map(async (id) => {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
        return res.data;
      })
    );
    return c.json(movies);
  } catch {
    return c.json({ error: "Failed to fetch movies" }, 500);
  }
});
await scrapeAndStore();
//get info for popular movies
app.get("/movies/popular", async (c) => {
  try {
    const movies = await Promise.all(
      movieIdContext.mostPopular.map(async (id) => {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
        return res.data;
      })
    );
    return c.json(movies);
  } catch {
    return c.json({ error: "Failed to fetch movies" }, 500);
  }
});
await scrapeAndStore();

//end of logic
console.log("Server on http://localhost:4000");
export default app;
serve({
    fetch: app.fetch,
    port:4000
});
