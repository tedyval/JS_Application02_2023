import { html, render, nothing } from './node_modules/lit-html/lit-html.js';
import { styleMap } from './node_modules/lit-html/directives/style-map.js'
import { contacts } from './contacts.js';

let data = contacts.map(c => Object.assign({}, c, { style: { display: "none" } }));
let contactCard = (contact) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${contact.name}</h2>
        <button class="detailsBtn" id="${contact.id}">Details</button>
        <div class="details" style="${styleMap(contact.style || {})}">
            <p>Phone number: ${contact.phoneNumber}</p>
            <p>Email: ${contact.email}</p>
        </div>
        
    
    </div>
</div>
`;

let divContacts = document.getElementById("contacts");
divContacts.addEventListener('click', onToggle)

render(data.map(c => contactCard(c)), divContacts);

function onToggle(event) {
    if (event.target.classList.contains("detailsBtn")) {
        let id = event.target.id;
        let contact = data.find(c => c.id == id);
        if (contact.style.display == 'none') {
            contact.style.display = 'block';
        } else {
            contact.style.display = 'none';
        }



        render(data.map(c => contactCard(c)), divContacts);
    }


}
