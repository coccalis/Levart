import { useParams } from "react-router-dom";
import CityResult from "../components/Search/CityResult";
import DiscoverResult from "../components/Search/DiscoverResult";
import HotelResult from "../components/Search/HotelResult";

function SearchResult() {
  const { category, name } = useParams();

  return (
    <>
      {category === "city" ? (
        <CityResult category={category} name={name} />
      ) : category === "hotel" ? (
        <HotelResult category={category} name={name} />
      ) : (
        <DiscoverResult category={category} name={name} />
      )}
    </>
  );
}

export default SearchResult;
