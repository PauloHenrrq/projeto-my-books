import { useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const user = {
    name: "Dennis Araújo",
    email: "dennis@gmail.com",
  };

  const handleScrollToFooter = () => {
    const footer = document.getElementById("footer");
    footer?.scrollIntoView({ behavior: "smooth" });
    setShowMenu(false);
  };

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 bg-[#F9FAFB] shadow-md">
        <div className="text-2xl font-bold text-[#1F2937]">📚 MyBooks</div>

        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 py-2 rounded-full cursor-pointer"
            >
              {user.name}
              <span className="text-xl">🔵</span>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg rounded-lg p-4 space-y-2 z-50">
                <div>
                  <p className="font-semibold text-[#1F2937]">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <button className="w-full text-left text-[#3B82F6] hover:underline cursor-pointer">
                  Configurações da Conta
                </button>

                <button
                  onClick={handleScrollToFooter}
                  className="w-full text-left text-[#3B82F6] hover:underline cursor-pointer"
                >
                  Contato
                </button>

                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setShowMenu(false);
                  }}
                  className="w-full text-left text-[#3B82F6] hover:underline cursor-pointer"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-4">
            <button
              onClick={() => setIsLoggedIn(true)}
              className="bg-[#3B82F6] text-white px-4 py-2 rounded cursor-pointer"
            >
              Login
            </button>
            <button className="bg-[#93C5FD] text-white px-4 py-2 rounded cursor-pointer">
              Cadastre-se
            </button>
          </div>
        )}
      </header>
    </>
  );
}
