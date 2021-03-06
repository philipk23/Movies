import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { getUserData } from '../services/authServices.js';

const template = (ctx) => html`
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <a class="navbar-brand text-light" href="/">Movies</a>
        <ul class="navbar-nav ml-auto "> 
            ${ctx.user.isAuthenticated
                ? html`
                    <li class="nav-item">
                        <a class="nav-link">Welcome, ${ctx.user.email}</a>
                    </li>
                     <li class="nav-item">
                         <a class="nav-link" href="/logout">Logout</a>
                    </li> 
                `
                : html`
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li> 
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li> 
                `
            }
        </ul>
    </nav>
`

export default class Navigation extends HTMLElement{
    connectedCallback(){
        this.user = getUserData();

        this.render();
    }

    render(){
        render(template(this), this, { eventContext: this});
    }
}