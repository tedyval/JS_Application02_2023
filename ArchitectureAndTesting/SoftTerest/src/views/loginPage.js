import { login,logout,register} from '../api/user.js';
import { navbarView } from '../util/util.js';

let divLogin = document.getElementById('loginPage');
let formLogin = divLogin.querySelector('form');
formLogin.addEventListener('submit',onLogin);


let ctx=null;
export async function showLoginPage(context){
    context.showSection(divLogin);
    ctx=context;
  
}

async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(formLogin);
    let data = Object.fromEntries(formData);
    let email = data.email
    let password = data.password
  
   
    if (email == '' || password == "") {
        alert('All inputs are needed')
        ctx.goTo('/register');
    }

    if (email.length < 3){
        alert("Email must be minimal 3 symbols")
        ctx.goTo('/register');
    }

    if (password.length < 3){
        alert("Password must be minimal 3 symbols")
        ctx.goTo('/register');
    }

    

    await login(email,password);
    formLogin.reset();
    ctx.goTo('/');
    navbarView();
}
