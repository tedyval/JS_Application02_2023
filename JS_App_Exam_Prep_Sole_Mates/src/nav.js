import {html,render} from './lib.js';
import {logout} from './api/user.js'

let header = document.querySelector('header');


export let navTemplate = (hasUser,onLogout)=> html`
<a id="logo" href="/"
      ><img id="logo-img" src="/images/logo.png" alt=""
    /></a>
<nav>
        <div>
            <a href="/dashboard">Dashboard</a>
            <a href="/search">Search</a>
        </div>

        ${hasUser 
            ? html`<div class="user">
        <a href="/addPair">Add Pair</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>` 
           : html` <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
          
</nav>
`;


export function showNav(ctx,next){
 let hasUser = ctx.hasUser;
  render(navTemplate(hasUser,onLogout),header);
  next();


  function onLogout(){
     logout();
    ctx.page.redirect('/dashboard')
  }


  
}