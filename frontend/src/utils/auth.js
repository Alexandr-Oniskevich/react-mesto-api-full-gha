const BASE_URL = "http://localhost:3000";

function checkServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkServerResponse)
}

export function register(email, password){
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password })
  })
}

export function login(email, password){
  return request(`${BASE_URL}/signin`,{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password })
  })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    })
}

export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: { "Content-Type": "application/json", authorization : `Bearer ${ token }` }
  })
}