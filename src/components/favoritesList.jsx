import { useFetchFavoritesQuery } from "../store";
import MovieCard from "./movieCard";

function FavoritesList() {
  const { data, error, isLoading } = useFetchFavoritesQuery();

  let content;

  if (isLoading) {
    content = <div>Loading your favorites...</div>;
  } else if (error) {
    content = <div>Error loading favorites. Make sure json-server is running!</div>;
  } else if (data) {
    if (data.length === 0) {
      content = <div className="alert alert-info w-100">You haven't added any favorites yet. Click the star on a movie to save it!</div>;
    } else {
      content = data.map((movie) => {
        return <MovieCard key={movie.id} movie={movie}></MovieCard>;
      });
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mt-5 mb-3">My Favorite Movies <span className="fas fa-heart text-danger"></span></h2>
      <div className="row row-cols-3 row-cols-md-2 m-4">
        {content}
      </div>
    </div>
  );
}

export default FavoritesList;