import { useFetchPopularMoviesQuery } from "../store";
import MovieCard from "./movieCard";

function PopularMoviesList() {
  const { data, error, isFetching } = useFetchPopularMoviesQuery();

  let content;

  if (isFetching) {
    content = <div>Loading movies...</div>;
  } else if (error) {
    content = <div>Error loading movies.</div>;
  // VIGTIGT: Her tjekker vi igen for data.results i stedet for kun data
  } else if (data && data.results) {
    // VIGTIGT: Vi burger data.results.map i stedet for data.map
    content = data.results
      .filter(movie => movie.poster_path !== null)
      .map((movie) => {
        return <MovieCard key={movie.id} movie={movie}></MovieCard>;
      });
  }

  return (
    <div className="container mt-4">
      <h2 className="mt-5 mb-3">Popular Movies</h2>
      <div className="row row-cols-3 row-cols-md-2 m-4">
        {content}
      </div>
    </div>
  );
}

export default PopularMoviesList;