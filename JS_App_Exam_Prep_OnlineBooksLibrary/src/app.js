import { getAll } from "./api/data.js";
import { getDataUser } from "./api/sessionData.js";
import { logout } from "./api/user.js";
import { render, page } from "./lib.js";
import { navTemplate, showNavigation } from "./nav.js";
import { showCreateForm } from "./views/create.js";
import { showDashboard,dashboardTemplate } from "./views/dashboard.js";
import { showDetails } from "./views/details.js";
import { showEditForm } from "./views/editOffer.js";

import { showLogin } from "./views/login.js";
import { showMyBooks } from "./views/myBooks.js";
import { showRegister } from "./views/register.js";

let main = document.querySelector('main');
let header = document.querySelector('header');


await dashboardPageLoad()
navigation();




page(decoration);
page(showNavigation);
page('/register', showRegister);
page('/login', showLogin);
page('/dashboard', showDashboard);
page('/myBooks', showMyBooks);
page('/details/:id', showDetails);
page('/create', showCreateForm);
page('/edit/:id', showEditForm);
page.start();




function decoration(ctx, next) {
    ctx.render = renderMain;
    ctx.hasUser = hasUserLoged();
    ctx.userId = ctx.hasUser ? getDataUser()._id : null;
    ctx.email= ctx.hasUser ? getDataUser().email : null;

    next();
}

function navigation() {
    let isUser = hasUserLoged();
    let email = hasUserLoged() ? getDataUser().email : null;
    render(navTemplate(isUser,email, onLogout), header);
}

async function dashboardPageLoad() {
    let data = await getAll();
    let isData = data.length > 0 ? true : false;
    render(dashboardTemplate(data,isData), main)
}

function hasUserLoged() {
    return getDataUser() ? true : false;
}

function renderMain(template) {
    render(template, main)
}

function onLogout() {
    logout();
    location.redirect('/dashboard')
}