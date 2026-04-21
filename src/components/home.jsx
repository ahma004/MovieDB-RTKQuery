// Bemærk stien: Vi går én mappe tilbage (..) for at finde assets-mappen
import MovieImg from '../assets/Image/movie_black2.jpg';

function Home() {
  return (
    <div className="text-center mt-5">
      <h2>Welcome to React Moviefinder!</h2>
      <p>Use the navigation bar above to explore Popular and Highest Rated movies.</p>
      <img 
        src={MovieImg} 
        alt="Movie Banner" 
        className="img-fluid rounded mt-4 shadow" 
        style={{ maxWidth: '600px' }} 
      />
    </div>
  );
}

export default Home;