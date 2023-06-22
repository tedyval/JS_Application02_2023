import {html} from '../lib.js';
import { register } from '../api/user.js'; 


export let registerTemplate =(onSubmit)=>html`
<section id="register">
<div class="form">
  <h2>Register</h2>
  <form @submit=${onSubmit} class="login-form">
    <input
      type="text"
      name="email"
      id="register-email"
      placeholder="email"
    />
    <input
      type="password"
      name="password"
      id="register-password"
      placeholder="password"
    />
    <input
      type="password"
      name="re-password"
      id="repeat-password"
      placeholder="repeat password"
    />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
</div>
</section>
`;


export function showRegister(ctx){
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePassword = formData.get("re-password");

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