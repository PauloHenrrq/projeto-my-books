import { useState } from "react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#F9FAFB] shadow-md">
      
      <div className="text-2xl font-bold text-[#1F2937] flex items-center gap-2">
        📚 MyBooks
      </div>

      
      <nav className="flex items-center space-x-6">
        
        <a href="#" className="text-[#3B82F6] hover:text-[#93C5FD] font-medium">
          Meus Livros
        </a>

       
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
        >
          P
        </div>
      </nav>

      {showMenu && (
        <div className="fixed top-0 right-0 h-full w-56 bg-white shadow-lg z-50 flex flex-col p-4 space-y-4 border-l">
          <button
            onClick={() => setShowMenu(false)}
            className="self-end text-[#3B82F6] font-bold"
          >
            ✕
          </button>
          <a href="#" className="text-[#1F2937] hover:text-[#3B82F6] font-medium">
            Perfil
          </a>
          <a href="#" className="text-[#1F2937] hover:text-[#3B82F6] font-medium">
            Contato
          </a>
          <a href="#" className="text-[#1F2937] hover:text-[#3B82F6] font-medium">
            Sair
          </a>
        </div>
      )}
    </header>
  );
}
