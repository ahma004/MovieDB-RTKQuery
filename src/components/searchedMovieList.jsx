import { useSelector } from "react-redux";
import { useFetchSearchMovieQuery } from "../store";
import MovieCard from "./movieCard";

function SearchedMovieList() {
  // 1. Vi henter det søgeord, brugeren lige har skrevet i søgefeltet
  const searchTerm = useSelector((state) => state.searchMovie.searchTerm);

  // 2. MAGI: Vi fodrer vores RTK Query hook med søgeordet!
  const { data, error, isFetching } = useFetchSearchMovieQuery(searchTerm);

  let content;

  if (isFetching) {
    content = <div>Searching for movies...</div>;
  } else if (error) {
    content = <div>Error loading search results.</div>;
  } else if (data && data.results) {
    // Ligesom før filtrerer vi film fra, der mangler plakater
    content = data.results
      .filter(movie => movie.poster_path !== null)
      .map((movie) => {
        return <MovieCard key={movie.id} movie={movie}></MovieCard>;
      });
  }

  return (
    <div className="container mt-4">
      <h2 className="mt-5 mb-3">Search Results for: "{searchTerm}"</h2>
      <div className="row row-cols-3 row-cols-md-2 m-4">
        {content}
      </div>
    </div>
  );
}

export default SearchedMovieList;