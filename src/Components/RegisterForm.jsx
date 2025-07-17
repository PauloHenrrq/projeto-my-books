import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../utils/localStorageRegister";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
  const { login } = useContext(AuthContext);
  const [authError, setAuthError] = useState(null);
  const [sucessPopUp, setucessPopUp] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    const username = data.username;
    const email = data.email.toLowerCase();
    const password = data.password;
    try {
      registerUser({ username, email, password });
      login(email,password);
      setAuthError(null);
      setucessPopUp(true);
      setTimeout(() => {
        setucessPopUp(false);
        navigate("/");
      }, 2000);
    } catch (erro) {
      setAuthError(erro.message);
    }
  };

  const password = watch("password");

  return (
    <div className="flex flex-col w-full items-center gap-3 ">
      <div className="flex flex-col items-center gap-2 mt-12 p-2 ">
        <h1 className="text-3xl text-[var(--titulo)] text-center font-bold md:text-5xl">
          Registre-se no MyBooks
        </h1>
        <p className="text-center text-[var(--texto)] md:text-xl">
          Seu catálogo de biblioteca disponível em qualquer lugar, a qualquer hora.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-72 bg-[var(--cinza-claro)] p-8 rounded-2xl space-y-4 md:max-w-md"
      >
        <div>
          <label className="block text-sm font-medium text-[var(--texto)]">
            Nome de Usuário
          </label>
          <input
            {...register("username", {
              required: "O nome de usuário é obrigatório",
              minLength: { value: 3, message: "Mínimo de 3 caracteres" },
              maxLength: { value: 20, message: "Máximo de 20 caracteres" },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Apenas letras, números e underline são permitidos",
              },
            })}
            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-[var(--azul-vivido)]`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--texto)]">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "O email é obrigatório",
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
              required: "A senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter no mínimo 6 caracteres",
              },
            })}
            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-[var(--azul-vivido)]`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--texto)]">
            Confirmar Senha
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "A confirmação de senha é obrigatória",
              validate: (value) => value === password || "As senhas não coincidem",
            })}
            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-[var(--azul-vivido)]`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
        {authError && (
          <p className="text-red-500 text-sm mt-1 text-center">{authError}</p>
        )}
        <button
          type="submit"
          className="w-full bg-[var(--azul-vivido)] text-white py-2 rounded-lg hover:bg-[var(--azul-escuro)] font-semibold cursor-pointer"
        >
          Registrar
        </button>
      </form>
      <Link
        to={"/login"}
        className="text-[var(--azul-escuro)] hover:text-blue-900"
      >
        Já tem uma conta? Faça login aqui.
      </Link>
      {sucessPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center gap-3 bg-white text-[var(--azul-vivido)] px-6 py-4 rounded-xl shadow-2xl animate-scale-in">
            <CheckCircleIcon className="w-7 h-7 text-[var(--azul-vivido)]" />
            <p className="text-base font-semibold">Conta criada com sucesso!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
