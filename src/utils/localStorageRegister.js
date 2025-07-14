const USER_KEY = "users";

export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

export function register(user) {
  try {
    isUser(user.email);
    addNewUser(user);
  } catch (erro) {
    throw new Error(erro.message);
  }
}

function isUser(userEmail) {
  const users = getUsers();
  const emailExist = users.some(
    (user) => user.email.toLowerCase() === userEmail.toLowerCase()
  );
  if (emailExist) {
    throw new Error("email já existe em nosso sistema");
  }
}

function addNewUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USER_KEY, JSON.stringify(users));
}
