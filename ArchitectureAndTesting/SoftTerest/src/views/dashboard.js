import { getAllIdeas } from "../api/data.js";

let divDashboard = document.getElementById('dashboard-holder');


export async function showDashboardPage(context) {
    context.showSection(divDashboard);
    divDashboard.replaceChildren();
    let data = await getAllIdeas();

    if (data.length == 0) {
        let h1 = document.createElement('h1');
        h1.textContent = 'No ideas yet! Be the first one :)';
        divDashboard.append(h1);
    } else {
        let fragment = document.createDocumentFragment();

        data.map(info => createCard(info)).forEach(card => fragment.appendChild(card));
        divDashboard.append(fragment);
    }


}


function createCard(info) {
    let div = document.createElement('div');
    div.className = "card overflow-hidden current-card details";
    div.style.width = "15rem";
    div.style.height = "25rem";
    div.innerHTML = `
    <div class="card-body">
        <p class="card-text">${info.title}</p>
    </div>
    <img class="card-image" src="${info.img}">
    <a data-id=${info._id} class="btn" href="/details">Details</a>
    `
    
    return div;
}