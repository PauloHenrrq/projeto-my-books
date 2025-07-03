import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

function FilterDropdown({ value, onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryFilterOptions = ["Todos", "Assunto", "Autor", "Título"];

  const dropdownRef = useRef();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block min-w-fit">
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-between w-full px-4 py-2 font-semibold ${
          isOpen ? "bg-gray-200" : "bg-white text-[var(--titulo)]"
        }  border border-gray-300 rounded-md cursor-pointer`}
      >
        {value}
        <span className="ml-2 w-5 h-5">
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </span>
      </button>

      {isOpen && (
        <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {queryFilterOptions.map((option) => (
            <li
              key={option}
              onClick={() => {
                setIsOpen(false);
                onClick(option);
              }}
              className="cursor-pointer w-full px-4 py-2 hover:bg-gray-200 text-[var(--texto)]"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterDropdown;
