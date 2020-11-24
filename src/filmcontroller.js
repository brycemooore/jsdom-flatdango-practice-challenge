class FilmController{

    static async init(){
        let filmsArray = await FilmController.getFilmsArray();
        FilmController.displayFilm(filmsArray[0]);
        document.getElementById('buy-div').addEventListener('click', FilmController.buyTicket);
        FilmController.displayFilms(filmsArray);
    }

    static async getFilmsArray(){
        let filmsArray = [];
        await Adapter.getFilms()
        .then(films => films.forEach(film => {
            filmsArray.push(new Film(film));
        }))
        return filmsArray;
    }

    static async getFilm(id){
        let theFilm;
        await Adapter.getFilm(id)
        .then(film => theFilm = new Film(film));
        return theFilm;
    }

    static replaceCurrentFilmPoster(film){
        let poster = document.getElementById('poster');
        while(poster.firstChild){
            poster.removeChild(poster.firstChild)
        }
        this.displayFilmPoster(film);
    }

    static displayFilmPoster(film){
        document.getElementById("poster").appendChild(film.createPoster());
    }

    static displayFilmInfo(film){
        document.getElementById('title').innerText = film.title;
        document.getElementById('runtime').innerText = film.runtime + ' minutes';
        document.getElementById('film-info').innerText = film.description;
        document.getElementById('showtime').innerText = film.showtime;
        document.getElementById('ticket-num').innerText = film.ticketsLeft();
        document.getElementById('buy-div').dataset.filmId = film.id;
    }

    static async buyTicket(event){
        let film = await FilmController.getFilm(event.target.dataset.filmId);
        film.tickets_sold += 1;
        if(film.soldOut()){
            alert('Film Sold Out!')
            return;
        }
        Adapter.updateFilm(film);
        FilmController.displayFilmInfo(film);
    }

    static async displayFilmOnClick(event){
        let film = await FilmController.getFilm(event.target.dataset.filmId);
        console.log(film);
        FilmController.displayFilmInfo(film);
        FilmController.replaceCurrentFilmPoster(film);
    }

    static displayFilm(film){
        FilmController.displayFilmInfo(film);
        FilmController.displayFilmPoster(film);
    }

    static displayFilms(filmsArray){
        let filmsDiv = document.getElementById('films');
        filmsArray.forEach(film => {
            let filmDiv = film.createFilmDiv()
            filmDiv.addEventListener('click', FilmController.displayFilmOnClick);
            filmsDiv.appendChild(filmDiv);
        })
    }
}