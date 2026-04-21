import { useParams, useNavigate } from 'react-router-dom';
import { useFetchMovieVideosQuery } from '../store';

function MovieTrailer() {
  // useParams trækker ID'et direkte ud af webadressen (f.eks. /trailer/12345)
  const { id } = useParams(); 
  const navigate = useNavigate();

  // Vi fodrer vores hook med det ID, vi fandt
  const { data, error, isFetching } = useFetchMovieVideosQuery(id);

  let content;

  if (isFetching) {
    content = <div>Loading trailer...</div>;
  } else if (error) {
    content = <div>Error loading trailer.</div>;
  } else if (data && data.results) {
    // Databasen returnerer mange videoer (teasers, behind the scenes). Vi leder efter en "Trailer" fra "YouTube"
    const trailer = data.results.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');

    if (trailer) {
      // Hvis vi fandt en trailer, laver vi en YouTube iframe
      content = (
        <div className="embed-responsive embed-responsive-16by9 mt-4 shadow-lg">
          <iframe 
            className="embed-responsive-item" 
            src={`https://www.youtube.com/embed/${trailer.key}`} 
            allowFullScreen 
            title="Movie Trailer"
          ></iframe>
        </div>
      );
    } else {
      content = <div className="alert alert-warning mt-4">Sorry, no trailer found for this movie.</div>;
    }
  }

  return (
    <div className="container mt-5 text-center">
      <h2>Movie Trailer</h2>
      {/* En lille "Tilbage" knap, så man nemt kan komme væk igen */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left"></i> Go Back
      </button>
      
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {content}
        </div>
      </div>
    </div>
  );
}

export default MovieTrailer;