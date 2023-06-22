import { login } from '../api/user.js';
import {html} from '../lib.js';



let loginTemplate =(onLogin)=>html`
<section id="login">
<div class="form">
  <h2>Login</h2>
  <form @submit=${onLogin} class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="password"
    />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="/register">Create an account</a>
    </p>
  </form>
</div>
</section>
`;


export async function showLogin(ctx){

    ctx.render(loginTemplate(onLogin));

    async function onLogin(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {email,password}= Object.fromEntries(formData);

        if(email =="" || password == ""){
         alert('All fields must be fulfilled');
         return
        }

        await login({email,password});
        e.target.reset();
        ctx.page.redirect('/dashboard');


    }
}