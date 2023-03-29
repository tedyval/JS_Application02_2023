
import { getDataUser } from './api/user.js';
import { page, render} from './lib.js';
import { updateNav } from './util.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEditForm } from './views/edit.js';

import { showHome, homeTemplate } from './views/home.js';
import { showLogin } from './views/login.js';
import { showProducts } from './views/products.js';
import { showRegister } from './views/register.js';



let main = document.querySelector('main');




showIndex();
page(updateNav)
page(decoratorContext);
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/products',showProducts);
page('/products/:id',showDetails);
 page('/edit/:id',showEditForm); 
page('/create',showCreate);

page.start();





function decoratorContext(ctx, next) {
   ctx.render = renderMain;
   ctx.hasUser= hasUser();
   next();
}

function renderMain(template) {
   render(template, main);
}


function showIndex(){
   render(homeTemplate(),main);
}

function hasUser(){
   let hasUser;
    if(getDataUser()){
        hasUser=true;
    }else{
        hasUser = false;
    }

    return hasUser;
}



