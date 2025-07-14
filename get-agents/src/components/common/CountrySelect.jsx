import { useState, useRef, useEffect } from "react";
import countries from "world-countries";
import { ChevronDown } from "lucide-react";

function CountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const countryList = countries.map((c) => ({
    name: c.name.common,
    code: c.cca2,
  }));

  const selectedCountry = countryList.find((c) => c.name === value);
  const filteredCountries = countryList.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (name) => {
    onChange(name);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label htmlFor="country" className="text-sm text-gray-700 font-medium mb-1 block">
        Country
      </label>

      {/* Clickable display box with flag & name */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-base bg-white"
      >
        <div className="flex items-center gap-2">
          {selectedCountry && (
            <img
              src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
              alt={selectedCountry.name}
              className="w-5 h-4 object-cover"
            />
          )}
          <span className="text-left text-gray-800">
            {selectedCountry ? selectedCountry.name : "Select a country"}
          </span>
        </div>
        <ChevronDown size={18} className="text-gray-500" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg text-base">
          {/* Search bar inside dropdown */}
          <input
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border-b border-gray-200 text-base focus:outline-none"
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <li
                  key={country.code}
                  onClick={() => handleSelect(country.name)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                >
                  <img
                    src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                    alt={country.name}
                    className="w-5 h-4 object-cover"
                  />
                  {country.name}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500 italic">No countries found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CountrySelect;
