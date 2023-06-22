import {html} from '../lib.js';
import { register } from '../api/user.js';



let registerTemplate =(onRegister)=>html`
<section id="register">
<div class="form">
  <h2>Register</h2>
  <form @submit=${onRegister} class="login-form">
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
    <button type="submit">login</button>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
</div>
</section>
`;

export function showRegister(ctx){
 ctx.render(registerTemplate(onRegister));
    


    async function onRegister(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let email= formData.get("email");
        let password= formData.get("password");
        let rePassword= formData.get("re-password");
    
    if([email,password,rePassword].some(val => val =="")){
        alert("All fields are required");
        return
    }

    if(password != rePassword){
        alert('Passwords do not match')
        return
    }


    await register({email,password})
    ctx.page.redirect('/dashboard')
    
    }
}