import { logout } from './api/user.js';
import {html,render} from './lib.js';

let header = document.querySelector('header');

export let navTemplate=(isUser,email,onLogout)=>html`
<nav class="navbar">
<section class="navbar-dashboard">
    <a href="/dashboard">Dashboard</a>
    ${isUser ? html`    <div id="user">
    <span>Welcome, ${email}</span>
    <a class="button" href="/myBooks">My Books</a>
    <a class="button" href="/create">Add Book</a>
    <a @click=${onLogout} class="button" href="javascript:void(0)">Logout</a>
</div>` : html`<div id="guest">
<a class="button" href="/login">Login</a>
<a class="button" href="/register">Register</a>
</div>`}
</section>
</nav>
`;


export function showNavigation(ctx,next){
 let isUser = ctx.hasUser;
 let email = ctx.email;   
render(navTemplate(isUser,email,onLogout),header);
next();

function onLogout(){
    logout();
    ctx.page.redirect('/dashboard');
}



}