import { logout } from './api/user.js';
import {html,render} from './lib.js';

let header = document.querySelector('header');

export let navTemplate=(isUser,onLogout)=> html`
<h1><a class="home" href="/">GamesPlay</a></h1>
<nav>
    <a href="/dashboard">All games</a>
    ${isUser ? html`<div id="user">
    <a href="/create">Create Game</a>
    <a @click=${onLogout} href="javascript:void(0)">Logout</a>
</div>` : html`  <div id="guest">
<a href="/login">Login</a>
<a href="/register">Register</a>
</div>`}
  </nav>
`;


export function showNavigation(ctx,next){
 let isUser = ctx.hasUser;   
render(navTemplate(isUser,onLogout),header);
next();

function onLogout(){
    logout();
    ctx.page.redirect('/');
}



}