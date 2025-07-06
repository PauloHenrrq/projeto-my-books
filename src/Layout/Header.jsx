import React from 'react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#F9FAFB] shadow-md">
     
      <div className="text-2xl font-bold text-[#1F2937]">
        Biblioteca de Livros
      </div>

      
      <nav className="flex items-center space-x-6">
      
        <button className="text-[#3B82F6] hover:text-[#93C5FD] font-medium">Filtrar Gênero</button>

        
        <a href="#" className="text-[#3B82F6] hover:text-[#93C5FD] font-medium">Meus Livros</a>

       
        <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
          P
        </div>
      </nav>
    </header>
  );
}
