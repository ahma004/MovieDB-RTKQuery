import { Routes, Route, Link } from 'react-router-dom';
import PopularMoviesList from "./components/popularMoviesList.jsx";
import HighestRatedMovieList from "./components/highestRatedMoviesList.jsx";
import Home from './components/home.jsx';
import MovieImg from './assets/Image/movie_black2.jpg';
import SearchMovie from "./components/searchMovie.jsx";
import SearchedMovieList from "./components/searchedMovieList.jsx";
import UpcomingMoviesList from "./components/upcomingMoviesList.jsx";
import MovieTrailer from "./components/movieTrailer.jsx";
import FavoritesList from './components/favoritesList.jsx';
import PopularTVList from './components/popularTVList.jsx';


function App() { 
  return (
    <div>
      <div className="jumbotron pb-3 pt-3">
        <div className="navbar navbar-expand-lg w-100 d-flex justify-content-between">
          <nav className="nav navbar-nav">    
            <Link to='/' className="nav-item nav-link">Home</Link>
            <Link to='/popular' className="nav-item nav-link">Popular</Link>
            <Link to='/highest-rated' className="nav-item nav-link">Highest Rated</Link>
            <Link to='/upcoming' className="nav-item nav-link">Upcoming</Link>
            <Link to='/favorites' className="nav-item nav-link">My Favorites</Link>
            <Link to='/tv' className="nav-item nav-link">TV Shows</Link>
          </nav>

          {/* 2. NYT: Her indsætter vi søgefeltet i vores menu! */}
          <SearchMovie />

        </div> 

        
        {/* 2. NYT: Vi tilføjer billedet ved siden af vores overskrift */}
        <span className='h1'>
          React Moviefinder 
          <img className="rounded m-3 shadow-sm" src={MovieImg} width="75" height="75" alt="logo" />
        </span>
        <span className="d-flex justify-content-between p-0 mt-2">
          This small App demonstrates React, Redux-Toolkit, RTK Query and React-Router
        </span>
      </div>

      <Routes> 
        <Route path='/' element={<Home/>} />   
        <Route path='/popular' element={<PopularMoviesList/>} />     
        <Route path='/highest-rated' element={<HighestRatedMovieList/>} />
        <Route path='/searchedMovie' element={<SearchedMovieList/>} />
        <Route path='/upcoming' element={<UpcomingMoviesList/>} />
        <Route path='/trailer/:id' element={<MovieTrailer/>} />
        <Route path='/favorites' element={<FavoritesList />} />
        <Route path='/tv' element={<PopularTVList />} />
      </Routes>
    </div>
  );
}

export default App;