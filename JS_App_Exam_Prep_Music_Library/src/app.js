import {page,render} from './lib.js';
import { navTemplate, updateNav } from './nav.js';
import { getDataUser } from './util.js';
import { showAlbums } from './views/catalog.js';
import { showCreateForm } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEditForm } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';

let header = document.querySelector('header');
let main = document.querySelector('main');

navigation();
showHome();
page(decorationContext);
page(updateNav); 
page('/',showHome);
page('/catalog',showAlbums); 
page('/catalog/:id',showDetails);
page('/create',showCreateForm);
page('/edit/:id',showEditForm)
page('/login',showLogin); 
page('/register',showRegister);
page.start();




function decorationContext(ctx,next){
  ctx.render=renderMain;
  ctx.hasUser= hasLogedUser();
   next();
}

function renderMain(template){
    render(template,main);
}

function hasLogedUser(){
    if(getDataUser()){
        return true
    }else{
        return false
    }
}

function navigation(){
    render(navTemplate(hasLogedUser(),onClick),header)
}

function onClick(){
    logout();
    location.redirect('/catalog');
   }





