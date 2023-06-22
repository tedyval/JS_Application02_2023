import {html} from '../lib.js';
import { login } from '../api/user.js'; 


export let loginTemplate =(onSubmit)=>html`
<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form @submit=${onSubmit} class="login-form">
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