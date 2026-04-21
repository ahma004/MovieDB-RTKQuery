import React from "react"; 
import { useFetchPopularTVQuery } from "../store";
import MovieCard from "./movieCard";


function PopularTVList() {
  const { data, error, isFetching } = useFetchPopularTVQuery();


  let content;

  if (isFetching) {
    content = <div>Loading TV shows...</div>;
  } else if (error) {
    content = <div>Error loading TV shows.</div>;
  } else if (data && data.results) {
    content = data.results.map((tvShow) => {
      // VIGTIGT: TV-serier bruger 'name' i stedet for 'title'. 
      // Vi "snyder" lidt og giver MovieCard en 'title' prop baseret på 'name',
      // så vi kan genbruge vores MovieCard uden at ændre i det!
      const normalizedTVShow = {
        ...tvShow,
        title: tvShow.name, 
        release_date: tvShow.first_air_date
      };
      
      return <MovieCard key={tvShow.id} movie={normalizedTVShow}></MovieCard>;
    });
  }

  return (
    <div className="container mt-4">
      <h2 className="mt-5 mb-3">Popular TV Shows</h2>
      <div className="row row-cols-3 row-cols-md-2 m-4">
        {content}
      </div>
    </div>
  );
}

export default PopularTVList;