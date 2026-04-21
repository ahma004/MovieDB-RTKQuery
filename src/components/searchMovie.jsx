import { useSelector, useDispatch } from "react-redux";
import { changeSearchTerm } from "../store";
import { useNavigate } from "react-router-dom";

function SearchMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // 1. Læsning: Hent det aktuelle søgeord fra vores Redux Store
  const searchTerm = useSelector((state) => {
    return state.searchMovie.searchTerm;
  });

  // 2. Skrivning: Hver gang brugeren taster et bogstav, opdaterer vi Storen
  const handleSearchTermChange = (event) => {
    dispatch(changeSearchTerm(event.target.value));
  }

  // 3. Handling: Kører når brugeren trykker 'Enter' eller klikker 'Search'
  const handleSubmit = (event) => {
    event.preventDefault(); // Forhindrer siden i at genindlæse (standard browser-adfærd)
    navigate("/searchedMovie"); // Sender brugeren til vores (kommende) resultatside
  }

    return (
   <form onSubmit={handleSubmit}>
     <label >Search</label>
     <input className="input ml-2" value={searchTerm} onChange={handleSearchTermChange}/>
     </form>    
  );
  
}

export default SearchMovie;