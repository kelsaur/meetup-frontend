import DropdownIcon from "../assets/dropdown_icon.svg";
import SearchIcon from "../assets/search_icon.svg";

function SearchInput() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <form
        aria-label="Sök efter meetups"
        className="flex items-center bg-gray-100 rounded-full shadow-sm px-4 py-2"
      >
        <button
          type="button"
          aria-label="Filtrera sökresultat"
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <img src={DropdownIcon} alt="Filter" className="w-5 h-5" />
        </button>

        <input
          type="text"
          placeholder="Sök efter meetups"
          className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400 px-2"
        />

        <button
          type="submit"
          aria-label="Sök"
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <img src={SearchIcon} alt="Search" className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
