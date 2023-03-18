import { del } from "../api/api.js";
import { getDetailsById, deleteIdeaById } from "../api/data.js";

let divDetails = document.getElementById('detailsPage');
let idOwner;
export async function showDetailsPage(context, id) {
    context.showSection(divDetails);
    divDetails.replaceChildren();
    let info = await getDetailsById(id);
    idOwner = info._ownerId;
    createDetails(info, id, idOwner);

}

function createDetails(info, id, idOwner) {
    divDetails.innerHTML = `
    <img class="det-img" src="${info.img}" />
    <div class="desc">
            <h2 class="display-5">${info.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${info.description}</p>
    </div>
    <div class="text-center">
            <a data-id="${info._id}" data-owner="${info._ownerId}" class="btn detb" href="/delete">Delete</a>
    </div>
    `;

    let a = divDetails.querySelector("div.text-center");

    let ownerInStorage;

    if (localStorage.getItem('user')) {
        ownerInStorage = JSON.parse(localStorage.getItem('user'))._id;
    }


    if (!ownerInStorage ) {
        a.remove();
        console.log(divDetails)
    } else if (ownerInStorage && info._ownerId != ownerInStorage) {
        console.log(id, ownerInStorage);
        a.remove();
    } /* else if (ownerInStorage && info._ownerId == ownerInStorage) {
        a.style.display = "inline-block";
    } */
}

export async function deleteIdea(context, id) {
    let ownerInStorage = JSON.parse(localStorage.getItem('user'))._id;
    if (idOwner == ownerInStorage) {
        let data = await deleteIdeaById(id);
        localStorage.removeItem("user");
        context.goTo('/dashboard');
    }
}