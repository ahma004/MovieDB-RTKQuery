import { useFetchUpcomingMoviesQuery } from "../store";
import MovieCard from "./movieCard";

function UpcomingMoviesList() {
  // Vi bruger vores spritnye hook
  const { data, error, isFetching } = useFetchUpcomingMoviesQuery();

  let content;

  if (isFetching) {
    content = <div>Loading upcoming movies...</div>;
  } else if (error) {
    content = <div>Error loading movies.</div>;
  } else if (data && data.results) {

    
    // Vi filtrerer igen for at undgå film uden plakater
    content = data.results
      .filter((movie) => movie.poster_path !== null)
      .map((movie) => {
        return <MovieCard key={movie.id} movie={movie}></MovieCard>;
      });
  }

  return (
    <div className="container mt-4">
      <h2 className="mt-5 mb-3">Upcoming Movies</h2>
      <div className="row row-cols-3 row-cols-md-2 m-4">
        {content}
      </div>
    </div>
  );
}

export default UpcomingMoviesList;