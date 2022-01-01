import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { deleteMovie, getOneById } from '../services/movieServices.js';
import { getUserData } from '../services/authServices.js';

const temaplate = (ctx) => html`
    <div class="container">
        <div class="row bg-light text-dark">
        <h1>Movie title: ${ctx.title}</h1>
            <div class="col-md-8">
                <img class="img-thumbnail" src="${ctx.imageUrl}" alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${ctx.description}</p>
                ${ctx.creator == ctx.user.email
                    ? html`
                        <a class="btn btn-danger" @click="${ctx.onDelete}">Delete</a>
                        <a class="btn btn-warning" href="${location.pathname}/edit">Edit</a>
                    `
                    : html`
                        <a class="btn btn-primary" href="#">Like</a>
                        <span class="enrolled-span">Liked 1</span>
                    `
                }
            </div>
        </div>
    </div>
`;

class MovieDetails extends HTMLElement{

    constructor(){
        super();

        this.user = getUserData();
    }

    connectedCallback(){
        //Getting the route params
        //console.log(this.location);
        //Assigning this.user = getUserData could be in the contructor

        getOneById(this.location.params.id)
            .then(data => {
                Object.assign(this, data);
                this.render();
            })
    }

    onDelete(){
        let movieid = location.pathname.replace('/details/', '').replace('/edit', '');

        deleteMovie(movieid)
            .then(res => {
                notify('Successfully deleted the movie', 'success');
                Router.go('/');
            })
    }

    render(){
        render(temaplate(this), this, { eventContext: this});
    }
}

export default MovieDetails;