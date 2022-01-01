import { Router } from 'https://unpkg.com/@vaadin/router';
import { html, render } from 'https://unpkg.com/lit-html?module';
import { getUserData } from '../services/authServices.js';
import { editMovie, getOneById } from '../services/movieServices.js';

const template = (ctx) => html`
    <form class="text-center border border-light p-5" action="#" method="" @submit="${ctx.onSubmit}">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" value="${ctx.movieData.title}" name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description">${ctx.movieData.description}</textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" value="${ctx.movieData.imageUrl}" name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
`;

export default class EditMovie extends HTMLElement{

    connectedCallback(){
        this.render();
    }

    onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);

        let movieData = {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
        };

        let movieId = location.pathname.replace('/details/', '').replace('/edit', '');

        editMovie(movieId, movieData)
            .then(res => {
                notify('Successfully edited the movie', 'success');
                Router.go(`/details/${movieId}`)
            })
    }

    render(){
        getOneById(this.location.params.id)
            .then(res => {
                this.movieData = res;
                render(template(this), this, { eventContext: this});
            })
    }
}