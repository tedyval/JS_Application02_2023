import { getUserData } from './api/sessionData.js';
import {page} from './lib.js';
import {render} from './lib.js';
import { navTemplate, showNav } from './nav.js';
import { showAddForm } from './views/addPair.js';
import { showDashboard } from './views/dashboard.js';
import { showDetails } from './views/details.js';
import { showEditForm } from './views/editForm.js';
import { homeTemplate, showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showSearch } from './views/search.js';

let main = document.querySelector('main');


navigation();
homePage();



page(decoration);
page(showNav);
page('/',showHome);
page('/login',showLogin);
page('/register',showRegister);
page('/dashboard',showDashboard);
page('/details/:id',showDetails);
page('/edit/:id',showEditForm);
page('/addPair',showAddForm);
page('/search',showSearch);


page.start();










function navigation(){
  let header = document.querySelector('header'); 
  render(navTemplate(getUserData()),header)
}

function decoration(ctx,next){
  ctx.render = renderMain;
  ctx.hasUser = getUserData() ? true : false;
  ctx.userId =getUserData() ? getUserData()._id : null;
  next()
}

function renderMain(template){
   
    render(template,main)
}

function homePage(){
    render(homeTemplate(),main)
}

