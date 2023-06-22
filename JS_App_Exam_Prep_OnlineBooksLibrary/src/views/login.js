import {html} from '../lib.js';
import { login } from '../api/user.js'; 


export let loginTemplate =(onSubmit)=>html`
<section id="login-page" class="login">
<form  @submit=${onSubmit} id="login-form" action="" method="">
    <fieldset>
        <legend>Login Form</legend>
        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>
        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Login">
    </fieldset>
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
    ctx.page.redirect('/dashboard');
  }

}