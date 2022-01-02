import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { deleteMovie, getOneById, likeMovie } from '../services/movieServices.js';
import { getUserData } from '../services/authServices.js';

const getMovie = async(movieId, email) => {
    let movieData = await getOneById(movieId);

    console.log(movieData);

    const likes = Object.values(movieData.likes || {});
    const hasLiked = await hasAlreadyLiked(likes, email);
    const likesCount = likes.length;

    Object.assign(movieData, {
        hasLiked,
        likesCount
    });

    console.log(movieData);

    return movieData;
}

const hasAlreadyLiked = async (likes, email) => {
    return Object.values(likes).some(like => like.email == email);
}

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
                        ${ctx.movieData.hasLiked
                            ? html`<span class="enrolled-span">Liked ${ctx.movieData.likesCount}</span>`
                            : html`<a class="btn btn-primary" @click="${ctx.onLike}">Like</a>`
                        }
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

    onDelete(e){
        e.preventDefault();

        let movieId = location.pathname.replace('/details/', '').replace('/edit', '');

        deleteMovie(movieId)
            .then(res => {
                notify('Successfully deleted the movie', 'success');
                Router.go('/');
            })
    }

    onLike(e){
        e.preventDefault();

        let movieId = location.pathname.replace('/details/', '').replace('/edit', '');

        likeMovie(movieId, getUserData().email)
            .then(data => {
                notify('Successfully liked the movie', 'success');
                render();
            });
    }

    render(){
        getMovie(this.location.params.id, getUserData().email)
            .then(res => {
                this.movieData = res;
                render(temaplate(this), this, { eventContext: this});
            })
    }
}

export default MovieDetails;