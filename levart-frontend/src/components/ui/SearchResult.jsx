import { useNavigate } from "react-router-dom";

function SearchResult({ result, category }) {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/search/${category}/${result.name || result.title}`);
  };

  return (
    <div
      className="hover:bg-gray-100 rounded-xl cursor-pointer p-5 flex flex-row items-center"
      onClick={handleNav}
    >
      <div className="">
        <img
          src={result.imageUrl}
          alt="city"
          className=" w-full h-32 object-cover rounded-lg aspect-[16/9]"
        />
      </div>
      <div className="pl-5 w-1/2">
        <h1 className="text-xl font-bold">{result.name || result.title}</h1>
        <p className="text-gray-500 font-semibold">
          {result.country || result.city}
        </p>
        <p className="text-gray-500 truncate font-semibold">
          {result.description}
        </p>
      </div>
    </div>
  );
}

export default SearchResult;
