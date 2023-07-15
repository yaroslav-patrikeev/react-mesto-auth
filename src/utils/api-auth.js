class ApiAuth {
  constructor() {
    this._BASE_URL = "https://auth.nomoreparties.co";
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(endpoint, options) {
    return fetch(this._BASE_URL + endpoint, options).then(
      this._getResponseData
    );
  }

  registration({ values, setOnSubmit }) {
    return this._request("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then(() => {
      setOnSubmit("success");
    });
  }

  authorization(values) {
    return this._request("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  }

  checkToken(token) {
    return this._request("/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default ApiAuth = new ApiAuth();
