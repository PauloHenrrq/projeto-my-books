import React from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dados enviados:", data);
  };

  const password = watch("password");

  return (
    <div className=" flex flex-col w-full items-center gap-10 ">
      <div className="flex flex-col items-center gap-2 mt-12 p-2 ">
        <h1 className="text-5xl text-[var(--titulo)] ">Registre-se no MyBooks</h1>
        <p className="text-medium">
          Seu catálogo de biblioteca disponível em qualquer lugar, a qualquer hora.
        </p>
      </div>

      <div className="w-full flex  items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
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
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
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
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
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
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
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
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
