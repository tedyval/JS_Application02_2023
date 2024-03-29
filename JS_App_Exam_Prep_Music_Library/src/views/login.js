import {html} from '../lib.js';
import { login } from '../api/user.js';


const loginTemplate =(onSubmit)=>html`
<section id="login">
<div class="form">
  <h2>Login</h2>
  <form @submit=${onSubmit} class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input type="password" name="password" id="password" placeholder="password" />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="/register">Create an account</a>
    </p>
  </form>
</div>
</section>
`;

export async function showLogin(ctx){
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        let formData = new FormData(event.target);
      let data = Object.fromEntries(formData);

      if(data.email =="" || data.password ==""){
        alert("All fields should be fulfield");
        event.target.reset();
        return
      }

      await login(data.email,data.password);
      event.target.reset();
      ctx.page.redirect('/catalog');
    }
}