import { useFetchHighestRatedMoviesQuery } from "../store";
import MovieCard from "./movieCard";

function HighestRatedMovieList() {
  // 1. Vi bruger det NYE hook, vi lavede i Step 9
  const { data, error, isFetching } = useFetchHighestRatedMoviesQuery();

  let content;

  if (isFetching) {
    content = <div>Loading highest rated movies...</div>;
  } else if (error) {
    content = <div>Error loading movies.</div>;
  } else {
    // 2. Vi filtrerer skraldet fra, inden vi laver kortene
    content = data.results
      .filter((movie) => movie.poster_path !== null && movie.vote_average !== 0)
      .map((movie) => {
        return <MovieCard key={movie.id} movie={movie}></MovieCard>;
      });
  }

   return (
    <div className="container mt-4">
      <h2 className="mt-5 mb-3">Highest Rated</h2>
      <div className="row row-cols-3 row-cols-md-2 m-4">
        {content}
      </div>
    </div>
  );
}

export default HighestRatedMovieList;