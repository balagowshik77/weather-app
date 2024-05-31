import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface InputProps {
  handleSearch: (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  location: string;
}

function Input({ handleSearch, setLocation, location }: InputProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleSearch(e);
  };

  return (
    <form
      className="flex flex-row items-center gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="relative flex items-center md:w-96 w-64 h-12 rounded-full focus-within:shadow-lg bg-white overflow-hidden">
        <div className="h-full w-12 p-2 flex items-center text-gray-300">
          <SearchIcon className="text-3xl" />
        </div>
        <input
          value={location}
          onKeyDown={handleSearch}
          onChange={(e) => setLocation(e.target.value)}
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder="Search something.."
        />
      </div>
      <button
        disabled={!location}
        className={`${
          location === "" && "cursor-not-allowed"
        } p-2 cursor-pointer text-lg font-medium hover:border-2 hover:border-black hover:bg-white hover:text-black bg-black text-white rounded-full`}
        type="button"
        onClick={handleClick}
      >
        Search
      </button>
    </form>
  );
}

export default Input;
