import FilterDropdown from "./FilterDropdown";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function SerachInput() {
  return (
    <div className="flex items-center gap-2 flex-grow bg-[var(--cinza-claro)] px-4 py-2 border border-gray-300 rounded-md">
      <input
        id="bar-search"
        type="text"
        placeholder="Digite Sua Busca..."
        className="flex-grow min-w-[150px] bg-[var(--cinza-claro)] text-[var(--texto)] placeholder-gray-400 focus:outline-none"
      />
      <MagnifyingGlassIcon className="w-6 h-6 text-[var(--azul-vivido)]" />
    </div>
  );
}

export default SerachInput;
