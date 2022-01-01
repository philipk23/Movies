import { Router } from 'https://unpkg.com/@vaadin/router';
import { html, render } from 'https://unpkg.com/lit-html?module';
import { getUserData } from '../services/authServices.js';
import { addMovie } from '../services/movieServices.js';

const template = (ctx) => html`  
    <form class="text-center border border-light p-5" action="#" method="" @submit="${ctx.onSubmit}">
        <h1>Add Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Title" name="title" value="">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Description" name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
`;

export default class AddMovie extends HTMLElement{
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
            creator: getUserData()
        }

        addMovie(movieData)
            .then(res => {
                notify('successfully added a movie', 'success');
                Router.go('/');
            })

    }

    render(){
        render(template(this), this, { eventContext: this });
    }
}