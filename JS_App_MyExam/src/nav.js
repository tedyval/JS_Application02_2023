import { logout } from './api/user.js';
import {html,render} from './lib.js';

let header = document.querySelector('header');

export let navTemplate=(isUser,onLogout)=>html`
<a id="logo" href="/"
><img id="logo-img" src="./images/logo.png" alt=""
/></a>

<nav>
<div>
  <a href="/dashboard">Events</a>
</div>
${isUser ? html`<div class="user">
<a href="/create">Add Event</a>
<a @click=${onLogout} href="javascript:void(0)">Logout</a>
</div>` : html`<div class="guest">
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