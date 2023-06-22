import {html} from '../lib.js';
import { login } from '../api/user.js'; 


export let loginTemplate =(onSubmit)=>html`
<section id="login-page" class="auth">
<form @submit=${onSubmit}id="login">

    <div class="container">
        <div class="brand-logo"></div>
        <h1>Login</h1>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

        <label for="login-pass">Password:</label>
        <input type="password" id="login-password" name="password">
        <input type="submit" class="btn submit" value="Login">
        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </div>
</form>
</section>
`;


export function showLogin(ctx){
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get("email");
    let password = formData.get("password");
   

    if([email,password].some(val=> val == "")){
        alert("All fields must be fulfilled");
        return
    }

   
   
   await login({email,password});
    ctx.page.redirect('/');
  }

}