import { html} from "../lib.js";
import { register } from "../api/user.js";

let registerTemplate=(onSubmit)=> html`
<section id="register">
<div class="form">
  <h2>Register</h2>
  <form @submit=${onSubmit} class="register-form">
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

    async function onSubmit(event){
      
      event.preventDefault();
      
      let formData = new FormData(event.target);

      console.log(formData);
      let result = Object.fromEntries(formData);
      
      if(result.email == "" || result.password == ""){
        return alert("All fields should be fulfilled")
      }

      if(result.password != result["re-password"]){
       alert('Passwords do ot match');
       ctx.page.redirect('/register');
      }
      event.target.reset();
    let data = await register(result.email,result.password);
    ctx.page.redirect('/products')
    }
}

