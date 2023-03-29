import { login } from "../api/user.js";
import { html} from "../lib.js";

let loginTemplate=(onSubmit)=> html`
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

    async function onSubmit(event){
  
      event.preventDefault();
      let formData = new FormData(event.target);
      
    
      let {email,password} = Object.fromEntries(formData);

      if(email =="" || password == ""){
      return  alert("All fields should be fulfilled");
      
      }
    event.target.reset();
    let data = await login(email,password);
    ctx.page.redirect('/products')
    }
}

