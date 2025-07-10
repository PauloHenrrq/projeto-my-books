export default function Footer() {
  return (
    <footer id="footer" className="p-6 bg-[#F9FAFB] shadow-inner text-center text-sm text-[#1F2937] space-y-4">
      {/* Navegação */}
      <nav className="flex justify-center space-x-6 text-[#3B82F6] font-medium">
        <a href="#" className="hover:text-[#93C5FD]">Início</a>
        <a href="#" className="hover:text-[#93C5FD]">Pesquisa por Filtro</a>
        <a href="#" className="hover:text-[#93C5FD]">Livros</a>
      </nav>

      {/* Contato */}
      <div className="space-y-2">
        <p className="font-semibold">Contato</p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/Dennissant"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3B82F6] hover:text-[#93C5FD]"
          >
            Dennis Araújo
          </a>
          <a
            href="https://github.com/PauloHenrrq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3B82F6] hover:text-[#93C5FD]"
          >
            Paulo Henrrq
          </a>
          <a
            href="https://github.com/emanuelfelicio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3B82F6] hover:text-[#93C5FD]"
          >
            Emanuel Felicio
          </a>
        </div>
      </div>

      <p className="text-xs text-[#93C5FD]">© 2025 MyBooks. Todos os direitos reservados.</p>
    </footer>
  );
}
