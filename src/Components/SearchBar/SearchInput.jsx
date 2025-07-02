import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function SerachInput({ value, onChange, onSearch }) {
  return (
    <div className="flex items-center flex-grow relative w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Digite Sua Busca..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        className="w-full bg-[var(--cinza-claro)] text-[var(--texto)] placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--azul-vivido)]"
      />
      <MagnifyingGlassIcon
        onClick={onSearch}
        className="w-5 h-5 text-[var(--azul-vivido)] cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
}

export default SerachInput;
