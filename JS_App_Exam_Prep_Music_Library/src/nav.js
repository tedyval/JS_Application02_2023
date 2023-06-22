import { logout } from './api/user.js';
import {html,render} from './lib.js';
import { getDataUser } from './util.js';

let header = document.querySelector('header');

export let navTemplate=(hasUser,onClick)=> html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
<nav>
        <div>
          <a href="/catalog">Dashboard</a>
        </div> ${hasUser ? html`<div class="user">
        <a href="/create">Add Album</a>
        <a  @click=${onClick} href="javascript:void(0)">Logout</a>
      </div>`
        :html`<div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>`} 
</nav>
`;

export function updateNav(ctx,next){
let user= getDataUser();
let hasUser=false;
if(user){
hasUser = true;
}

 render(navTemplate(hasUser,onClick),header)
 next();


 function onClick(){
  logout();
  ctx.page.redirect('/catalog');
 }
}