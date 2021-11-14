import { API } from "../../backend";


export const getUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            // console.log(response)
            return response.json();
        })
        .catch((err) => console.log(err));
};



export const updateUserProfile = (userId, token, user) => {
    return fetch(`${API}/user/update/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
