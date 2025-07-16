import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-[var(--cinza-claro)]">
      <div className="flex justify-around p-8">
        <nav className="flex flex-col space-y-4">
          <p className="font-semibold ">Navegação</p>
          <Link
            to={"/"}
            className="text-[var(--azul-vivido)] hover:text-[var(--azul-claro)]"
          >
            Início
          </Link>
          <Link
            to={"/mybooks"}
            className="text-[var(--azul-vivido)] hover:text-[var(--azul-claro)]"
          >
            Favoritos
          </Link>
        </nav>

        <div className="flex flex-col space-y-4">
          <p className="font-semibold">Contatos</p>
          <a
            href="https://github.com/Dennissant"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--azul-vivido)] hover:text-[var(--azul-claro)]"
          >
            Dennis Araújo
          </a>
          <a
            href="https://github.com/PauloHenrrq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--azul-vivido)] hover:text-[var(--azul-claro)]"
          >
            Paulo Henrrq
          </a>
          <a
            href="https://github.com/emanuelfelicio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--azul-vivido)] hover:text-[var(--azul-claro)]"
          >
            Emanuel Felicio
          </a>
        </div>
      </div>

      <p className="text-xs text-[#93C5FD] border-t border-gray-300 text-center p-4">
        © 2025 MyBooks. Todos os direitos reservados.
      </p>
    </footer>
  )
}
