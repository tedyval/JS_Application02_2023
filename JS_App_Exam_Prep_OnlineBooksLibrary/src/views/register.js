import {html} from '../lib.js';
import { register } from '../api/user.js'; 


export let registerTemplate =(onSubmit)=>html`
<section id="register-page" class="register">
<form @submit=${onSubmit} id="register-form" action="" method="">
    <fieldset>
        <legend>Register Form</legend>
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
        <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Register">
    </fieldset>
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
    let rePassword = formData.get("confirm-pass");

    if([email,password,rePassword].some(val=> val == "")){
        alert("All fields must be fulfilled");
        return
    }

    if(password != rePassword){
        alert("Passwords dont match");
        return
    }

    
   await register({email,password});
  
    ctx.page.redirect('/dashboard');
  }

}