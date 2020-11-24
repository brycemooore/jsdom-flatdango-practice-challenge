class Film{

    constructor(film){
        this.id = film.id;
        this.title = film.title;
        this.runtime = film.runtime;
        this.capcity = film.capacity;
        this.showtime = film.showtime;
        this.tickets_sold = film.tickets_sold;
        this.description = film.description;
        this.poster = film.poster;
    }

    ticketsLeft(){
        return this.capcity - this.tickets_sold;
    }

    soldOut(){
        if(this.tickets_sold > this.capcity){
            return true;
        }
        return false;
    }

    createPoster(){
        let poster = new Image();
        poster.src = this.poster;
        return poster;
    }

    createFilmDiv(){
        let div = document.createElement('div');
        div.append(this.title);
        div.classList.add('film-item');
        if(this.soldOut()) div.classList.add('sold-out');
        div.dataset.filmId = this.id;
        return div;
    }
}