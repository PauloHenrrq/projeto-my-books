// auth.js
import { getUsers as getUsersFromRegister } from "./localStorageRegister";

const STORAGE_USER_KEY = "loggedUser";
export function loginStorage(InputEmail, InputPassword) {
  try {
    isAlreadyLogged();
    const user = findUser(InputEmail);
    validatePassword(user, InputPassword);
    setLoggedUser(user);
  } catch (error) {
    throw new Error(error.message);
  }
}

export function logoutStorage() {
  localStorage.removeItem(STORAGE_USER_KEY);
}

function isAlreadyLogged() {
  const loggedUser = getLoggedUser();
  if (loggedUser) {
    throw new Error("Já existe um usuário logado");
  }
}

function findUser(email) {
  const users = getUsersFromRegister();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
}

function validatePassword(user, inputPassword) {
  if (user.password !== inputPassword) {
    throw new Error("Senha incorreta");
  }
}
export function getLoggedUser() {
  return JSON.parse(localStorage.getItem("loggedUser")) || null;
}
function setLoggedUser(user) {
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
}
