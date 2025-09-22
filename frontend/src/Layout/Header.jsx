import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, BookOpenIcon} from '@heroicons/react/24/solid'
import {
  HomeIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  UserPlusIcon,
  StarIcon,
  UserIcon
} from '@heroicons/react/20/solid'

export default function Header () {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="bg-[var(--cinza-claro)] border-b border-gray-300">
      <div className="flex items-center justify-between px-6 py-4 w-full">
        {/* telas menores*/}
        <div className="md:hidden">
          <div className="flex items-center text-[var(--azul-vivido)]">
            <BookOpenIcon className="w-6 inline mr-1 " />
            <h1
              className="text-xl font-bold inline cursor-pointer "
              onClick={() => navigate("/")}
            >
              MyBooks
            </h1>
          </div>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setShowMobileMenu(true)}
            className="text-[var(--texto)] w-6 h-6 block"
            aria-label="Abrir menu"
          >
            <Bars3Icon />
          </button>
        </div>

        <nav
          className={`fixed top-0 right-0 h-full w-3/4 bg-[var(--cinza-claro)] border-l border-gray-300 z-11 transform transition-transform duration-300 ease-in-out
          ${showMobileMenu ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div className="text-lg font-semibold">Explorar MyBooks</div>
            <button
              onClick={() => setShowMobileMenu(false)}
              aria-label="Fechar menu"
              className="text-[var(--texto)] w-6 h-6 block"
            >
              <XMarkIcon />
            </button>
          </div>

          <div className="p-4 space-y-4 flex flex-col items-start">
            {/* {isLogged && (
              <h2 className="text-[var(--titulo)] font-semibold text-xl mb-5">
                Olá, {user.username}
              </h2>
            )} */}
            <div
              className="flex flex-row items-center gap-2 text-[var(--azul-vivido)]"
              onClick={() => {
                setShowMobileMenu(false);
                navigate("/");
              }}
            >
              <button className="font-medium">Página inicial</button>
              <HomeIcon className="w-4 h-4" />
            </div>
            <div
              className="flex flex-row items-center gap-2 text-[var(--azul-vivido)]"
              onClick={() => navigate("/mybooks")}
            >
              <button className="font-medium ">Favoritos</button>
              <StarIcon className="w-4 h-4" />
            </div>
            {/* {isLogged ? (
              <>
                <div className="flex flex-row items-center gap-2 text-[var(--azul-vivido)]">
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      logout();
                    }}
                    className="font-medium"
                  >
                    Sair
                  </button>
                  <ArrowLeftEndOnRectangleIcon className="w-4 h-4" />
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex flex-row items-center gap-2 text-[var(--azul-vivido)]"
                  onClick={() => navigate("/login")}
                >
                  <button className="font-medium">Entrar</button>
                  <ArrowRightEndOnRectangleIcon className="w-4 h-4" />
                </div>
                <div
                  className="flex flex-row items-center gap-2 text-[var(--azul-vivido)]"
                  onClick={() => navigate("/register")}
                >
                  <button className="font-medium">Cadastre-se</button>
                  <UserPlusIcon className="w-4 h-4" />
                </div>
              </>
            )} */}
          </div>
        </nav>

        {showMobileMenu && (
          <div
            onClick={() => setShowMobileMenu(false)}
            className="md:hidden fixed inset-0 z-10"
          />
        )}

        {/* telas maiores */}
        <div className="hidden md:flex gap-10 space-x-4 text-[var(--azul-vivido)]">
          <div className="flex items-center">
            <BookOpenIcon className="w-7 inline mr-1 xl:w-9" />
            <h1
              className="text-2xl font-bold inline cursor-pointer xl:text-3xl "
              onClick={() => navigate("/")}
            >
              MyBooks
            </h1>
          </div>

          <nav className="hidden md:flex gap-2 space-x-4">
            <button
              className="text-[var(--azul-vivido)] font-medium hover:text-[var(--azul-claro)] transition duration-200 cursor-pointer lg:text-[18px]"
              onClick={() => navigate("/")}
            >
              Página inicial
            </button>
            <button
              className="text-[var(--azul-vivido)] font-medium hover:text-[var(--azul-claro)]  duration-200  cursor-pointer lg:text-[18px]"
              onClick={() => navigate("/mybooks")}
            >
              Favoritos
            </button>
          </nav>
        </div>

        <div className="hidden md:flex space-x-4">
          {/* {isLogged ? (
            <>
              <div className="flex flex-row items-center gap-2 bg-[var(--azul-vivido)] text-[var(--cinza-claro)] px-4 py-2 rounded-3xl ">
                <UserIcon className="w-5 h-5" />
                <p className="cursor-default">{user.username}</p>
              </div>
              <div
                className="flex flex-row items-center gap-2 bg-[var(--azul-vivido)]  hover:bg-[var(--azul-claro)] text-[var(--cinza-claro)] px-4 py-2 rounded-3xl cursor-pointer"
                onClick={() => logout()}
              >
                <ArrowLeftEndOnRectangleIcon className="w-4 h-4" />
                <p className="font-medium">Sair</p>
              </div>
            </>
          ) : (
            <>
              <div
                className="flex flex-row items-center gap-2 bg-gray-500 hover:bg-gray-400 text-[var(--cinza-claro)] px-4 py-2 rounded-3xl cursor-pointer "
                onClick={() => {
                  navigate("/login");
                }}
              >
                <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                <p className="font-medium">Entrar</p>
              </div>
              <div
                className="flex flex-row items-center gap-2 bg-[var(--azul-vivido)]  hover:bg-[var(--azul-claro)] text-[var(--cinza-claro)] px-4 py-2 rounded-3xl cursor-pointer"
                onClick={() => navigate("/register")}
              >
                <UserPlusIcon className="w-5 h-5" />
                <p className="font-medium">Cadastre-se</p>
              </div>
            </>
          )} */}
        </div>
      </div>
    </header>
  );
}
