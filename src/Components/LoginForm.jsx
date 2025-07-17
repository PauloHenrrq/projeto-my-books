import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [authError, setAuthError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const onSubmit = (data) => {
    const { email, password } = data;
    try {
      login(email, password);
      setAuthError(null);
      navigate("/")
      
    } catch (erro) {
      setAuthError(erro.message);
    }
  };

  return (
    <div className="flex flex-col w-full h-[80vh]">
      <div className="flex flex-col items-center m-auto w-full ">
        <div className="mb-4">
          <h1 className="text-3xl text-[var(--titulo)] text-center font-bold md:text-4xl">
            Entrar
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-[var(--cinza-claro)] p-8 rounded-2xl space-y-4 w-full max-w-72 md:max-w-md"
        >
          <div>
            <label className="block text-sm font-medium text-[var(--texto)]">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Digite um email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de email inválido",
                },
              })}
              className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[var(--azul-vivido)]`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--texto)]">Senha</label>
            <input
              type="password"
              {...register("password", {
                required: "Digite uma senha",
              })}
              className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[var(--azul-vivido)]`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          {authError && (
            <p className="text-red-500 text-sm mt-1 text-center">{authError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[var(--azul-vivido)] text-white py-2 rounded-lg hover:bg-[var(--azul-escuro)] font-semibold cursor-pointer"
          >
            Entrar
          </button>
        </form>
        <Link
          to={"/register"}
          className="text-[var(--azul-escuro)] hover:text-blue-900 mt-2"
        >
          Ainda não tem uma conta? Cadastre-se agora.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
