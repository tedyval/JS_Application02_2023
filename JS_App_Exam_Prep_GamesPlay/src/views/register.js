import {html} from '../lib.js';
import { register } from '../api/user.js'; 


export let registerTemplate =(onSubmit)=>html`
<section id="register-page" class="content auth">
<form @submit="${onSubmit}" id="register">
    <div class="container">
        <div class="brand-logo"></div>
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="maria@email.com">

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password">

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password">

        <input class="btn submit" type="submit" value="Register">

        <p class="field">
            <span>If you already have profile click <a href="/login">here</a></span>
        </p>
    </div>
</form>
</section>
`;


export function showRegister(ctx){
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePassword = formData.get("confirm-password");

    if([email,password,rePassword].some(val=> val == "")){
        alert("All fields must be fulfilled");
        return
    }

    if(password != rePassword){
        alert("Passwords dont match");
        return
    }

    
   await register({email,password});
  
    ctx.page.redirect('/');
  }

}