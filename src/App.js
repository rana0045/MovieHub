import React, {useEffect, useState} from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import Searchicon from "./search.svg";

//9d4832e1
const api = "http://www.omdbapi.com/?i=tt3896198&apikey=9d4832e1";
const App = () => {
  const [movies, setmovies] = useState([]);
  const [search, setsearch] = useState("spiderman");

  const searchMovies = async (title) => {
    const reposone = await fetch(`${api}&s=${title}`);
    const data = await reposone.json();
    setmovies(data.Search);
    console.log(data.Search);
  };

  useEffect(() => {
    searchMovies({search});
  }, []);

  return (
    <div className="app">
      <h1>Movie Hub</h1>
      <div className="search">
        <input
          placeholder="Search Movies"
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
          }}></input>
        <img
          src={Searchicon}
          alt="icon"
          onClick={() => {
            searchMovies(search);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>NO movies availbe</h2>
        </div>
      )}
    </div>
  );
};

export default App;
