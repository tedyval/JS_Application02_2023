import {html} from '../lib.js';
import { register } from '../api/user.js';


const registerTemplate =(onSubmit)=>html`
<section id="register">
        <div class="form">
          <h2>Register</h2>
          <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login>Login</a></p>
          </form>
        </div>
</section>
`;

export async function showRegister(ctx){
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        let formData = new FormData(event.target);
      let data = Object.fromEntries(formData);

      if(data.email =="" || data.password =="" || data["re-password"] == ""){
        alert("All fields should be fulfield");
        event.target.reset();
        return
      }

      if(data.password != data["re-password"]){
        alert("Passwords do not match");
        return
      }

      await register(data.email,data.password);
      ctx.page.redirect('/catalog');
    }
}