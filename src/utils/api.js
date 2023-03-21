class Api {
    #baseUrl;
    #headers;
    constructor({baseUrl, headers}) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    #onResponse(res) {
         res.ok ? res.json() : res.json().then(err => Promise.reject(err))
    }

    getProductsList() {
        return fetch(`${this.#baseUrl}/products`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getUserInfo() {
        return fetch(`${this.#baseUrl}/users/me`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }
}


const api = new Api({
    baseUrl: 'https://api.react-learning.ru',                               //   /v2/group-11
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOGFhMzk3MTIxODM4ZjI4Y2MiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ1LCJleHAiOjE3MTAzMzg0NDV9.kZEWWebomQEcFQ3JyjUuF8l3B_o5sLselfMazIwH6VM'
    }
})

api.getProductsList()
    .then(data => console.log(data))
    .catch(err => console.log(err))

api.getUserInfo()
    .then(data => console.log(data))
    .catch(err => console.log(err))

export default api;