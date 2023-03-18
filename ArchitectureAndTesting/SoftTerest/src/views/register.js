import { login,logout,register} from '../api/user.js';
import { navbarView } from '../util/util.js';

let divRegister = document.getElementById('registerPage');
let formReg = divRegister.querySelector('form');
formReg.addEventListener("submit", onRegister);



let ctx=null;
export async function showRegisterPage(context) {
    ctx=context;
    context.showSection(divRegister);

}

async function onRegister(event) {
    event.preventDefault();
    let formData = new FormData(formReg);
    let data = Object.fromEntries(formData);
    let email = data.email
    let password = data.password
    let repeatPassword = data.repeatPassword;
    
    if (email == '' || password == "" || repeatPassword == "") {
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

    if (password != repeatPassword){
        alert("Passwords do not match")
        ctx.goTo('/register');
    }

    await register(email,password);
    formReg.reset();
    ctx.goTo('/');
    navbarView();
}