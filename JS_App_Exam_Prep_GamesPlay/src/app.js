import { getFirstThreeGames } from "./api/data.js";
import { getDataUser} from "./api/sessionData.js";
import { logout } from "./api/user.js";
import { render,page } from "./lib.js";
import { navTemplate, showNavigation } from "./nav.js";
import { showCreateForm } from "./views/create.js";
import { showDashboard } from "./views/dashboard.js";
import { showDetails } from "./views/details.js";
import { showEditForm } from "./views/editOffer.js";
import { homeTemplate, showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

let main = document.querySelector('main');
let header = document.querySelector('header');


await homePageLoad();
navigation();




page(decoration);
page(showNavigation);
page('/',showHome);
page('/register',showRegister);
page('/login',showLogin);
page('/dashboard',showDashboard);
page('/details/:id',showDetails);
page('/create',showCreateForm);
page('/edit/:id',showEditForm);
page.start();




function decoration(ctx,next){
ctx.render= renderMain;
ctx.hasUser = hasUserLoged();
ctx.userId = ctx.hasUser ? getDataUser()._id : null;

next();
}

function navigation(){
let isUser =hasUserLoged()
render(navTemplate(isUser,onLogout),header);
}

async function homePageLoad(){
    let data = await getFirstThreeGames()
render(homeTemplate(data),main)
}

function hasUserLoged(){
    return getDataUser() ? true : false; 
}

function renderMain(template){
    render(template,main)
}

function onLogout(){
    logout();
    location.redirect('/')
}