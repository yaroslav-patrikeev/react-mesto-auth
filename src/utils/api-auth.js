export default class ApiAuth {
  constructor() {
    this._BASE_URL = "https://auth.nomoreparties.co";
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  registration({ registerData, setOnSubmit }) {
    return fetch(`${this._BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    })
      .then(this._getResponseData)
      .then(() => {
        setOnSubmit("success");
      });
  }

  authorization(authorizationData) {
    return fetch(`${this._BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authorizationData),
    }).then(this._getResponseData);
  }

  checkToken(token) {
    return fetch(`${this._BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }
}
