import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((reponse) => {
      return reponse.json();
    })
    .catch((err) => console.log(err));
};

export const getAllOrders = (userId, token) => {
  return fetch(`${API}/order/all/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

  })
    .then((reponse) => {
      return reponse.json();
    })
    .catch((err) => console.log(err));
};

export const getUserOrder = (userId, token) => {
  return fetch(`${API}/user/orders/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

  })
    .then((reponse) => {
      return reponse.json();
    })
    .catch((err) => console.log(err));
};

