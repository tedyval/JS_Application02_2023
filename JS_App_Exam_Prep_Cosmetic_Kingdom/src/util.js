import { html,render,page } from "./lib.js";
import { getDataUser,logout } from "./api/user.js";

let header = document.querySelector('header');

let navTemplate = (hasUser,onLogout)=> html`
<a id="logo" href="/"
><img id="logo-img" src="images/logo.png" alt=""
/></a>
<nav>
          <div>
            <a href="/products">Products</a>
          </div>
 ${hasUser 
        ? html`<div class="user">
       <a href="/create">Add Product</a>
       <a @click=${onLogout} href="javascript:void(0)">Logout</a>
     </div>`
        : html`<div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>`} 
</nav>
`;

export function updateNav(ctx,next){
    let hasUser;
    if(getDataUser()){
        hasUser=true;
    }else{
        hasUser = false;
    }
    render(navTemplate(hasUser,onLogout),header);

    async function onLogout(){
        logout();
        page.redirect('/products')
    }

    next();
}