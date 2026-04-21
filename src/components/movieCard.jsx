import { Link } from 'react-router-dom';
import { useAddFavoriteMutation, useRemoveFavoriteMutation, useFetchFavoritesQuery } from '../store';

function MovieCard({ movie }) {
  // Grundadressen for at hente billeder fra TheMovieDB's server
  const posterBasePath = 'https://image.tmdb.org/t/p/w185';
  
  /** * 1. HOOKS (Datahentning og Handlinger)
   * Vi henter listen af favoritter fra vores lokale JSON-server.
   * Vi bruger mutations-hooks til at ændre data (POST og DELETE).
   */
  const { data: favorites = [] } = useFetchFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();


  /**
   * 2. LOGIK: ER FILMEN EN FAVORIT?
   * Vi tjekker om den aktuelle film findes i vores favorit-liste.
   * Vi sammenligner både ID (som tekst for at undgå fejl) og TITEL.
   * Dette sikrer, at stjernen lyser gult, selvom ID'erne driller.
   */
  const isFavorite = favorites.some((fav) => 
    String(fav.id) === String(movie.id) || fav.title === movie.title
  );

  /**
   * 3. EVENT HANDLER: KLIK PÅ STJERNE
   * Denne funktion kører, når brugeren trykker på stjernen.
   */
  const handleFavoriteClick = async (e) => {
    // Forhindrer uønsket adfærd, hvis ikonet er placeret inde i andre links
    e.preventDefault();
    
    if (isFavorite) {
      // Hvis filmen ER en favorit, skal den fjernes.
      // Vi finder det specifikke objekt i vores favorit-liste, så vi har det rigtige ID til sletning.
      const favToDelete = favorites.find((f) => 
        String(f.id) === String(movie.id) || f.title === movie.title
      );
      if (favToDelete) {
        removeFavorite(favToDelete);
      }
    } else {
      // Hvis filmen IKKE er en favorit, sender vi hele movie-objektet til JSON-serveren
      addFavorite(movie);
    }
  };

  return (
    <div className="col-lg-2 mb-4">
      <div className="card h-100 shadow-sm">
        {/* Filmlplakaten sammensat af base-stien og filmens unikke billed-sti */}
        <img src={posterBasePath + movie.poster_path} className="card-img-top" alt={movie.title} />
        
        <div className="card-body d-flex flex-column">
          {/* Titel: substring sikrer, at ekstremt lange titler ikke ødelægger layoutet */}
          <h5 className="card-title">
            <span style={{fontSize: '1.1rem'}}>{movie.title.substring(0, 200)}</span>
          </h5>

          {/* Favorit-sektion: Her styres ikonet af isFavorite-logikken fra tidligere */}
          <div className="mb-2" onClick={handleFavoriteClick} style={{cursor: 'pointer'}}>
             {/* Hvis isFavorite er true, bruges 'fas' (solid/gul), ellers 'far' (regular/tom) */}
             <span className={isFavorite ? "fas fa-star text-warning" : "far fa-star"}></span>
             <span className="ml-1">{movie.vote_average}</span>
          </div>
          
          {/* Beskrivelse: substring(0, 125) skaber et ensartet look på alle kort */}
          <p className="card-text small text-muted">
            {movie.overview.substring(0, 125).concat('....')}
          </p>
          
          {/* Bund-sektion med Dato og Link til Trailer */}
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <span className="far fa-calendar" aria-hidden="true"> {movie.release_date}</span>
            
            {/* React Router Link: Sender filmens ID med i URL'en, så trailer-siden ved hvilken film det er */}
            <Link to={`/trailer/${movie.id}`}>
                <span className="far fa-play-circle text-primary" style={{cursor: 'pointer', fontSize: '1.5rem'}}></span>
            </Link>
          </div>            
        </div>
      </div>
    </div>
  );
}

export default MovieCard;