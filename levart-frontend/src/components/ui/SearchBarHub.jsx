import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchGroupData } from "../../store/groupSlice";
import { fetchSearchData } from "../../store/browseSlice";

function SearchBarHub({ setResults, setIsLoading }) {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const { groupSearchData } = useSelector((state) => state.group);
  const { searchData } = useSelector((state) => state.browse);

  useEffect(() => {
    if (input.trim() === "") {
      setResults([]);
      setIsLoading(false);
      return;
    }

    if (input.length > 2) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        Promise.all([
          dispatch(fetchSearchGroupData({ searchInput: input })),
          dispatch(fetchSearchData({ searchInput: input })),
        ])
          .then(() => {
            const extractedSearchData =
              searchData && typeof searchData === "object"
                ? Object.values(searchData).flat()
                : [];

            const combinedResults = [
              ...(Array.isArray(groupSearchData) ? groupSearchData : []),
              ...extractedSearchData,
            ];

            setResults(combinedResults);
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false));
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [input, dispatch]);

  return (
    <div>
      <Input
        classNames={{
          base: "w-screen   h-10",
          mainWrapper:
            "h-full border-1 border-gray-300 data-[focus-visible=true]:border-gray-500 rounded-lg",
          input: "text-small",
          inputWrapper: "h-full font-normal text-default-500 bg-white",
        }}
        placeholder="Type to search..."
        size="sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        startContent={<FontAwesomeIcon icon={faSearch} />}
        isClearable
        type="text"
        className="max-w-xl"
        onClear={() => {
          setInput("");
          setResults([]);
        }}
      />
    </div>
  );
}

export default SearchBarHub;
