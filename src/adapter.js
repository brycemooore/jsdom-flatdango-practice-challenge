class Adapter{

    static #baseUrl = "http://localhost:3000/films";

    static getFilm(id){
        return fetch(this.#baseUrl + '/' + id).then(res => res.json());
    }

    static async getFilms(){
        return fetch(this.#baseUrl).then(res => res.json());
    }

    static updateFilm(updatedFilm){
        let requestURL = this.#baseUrl + '/' + updatedFilm.id;
        let request = new Object();
        request.method = 'PATCH';
        request.headers = {
            "Content-Type": "application/json"
        };
        request.body = JSON.stringify(updatedFilm);

        return fetch(requestURL, request)
        .then(res => res.json());
    }
}