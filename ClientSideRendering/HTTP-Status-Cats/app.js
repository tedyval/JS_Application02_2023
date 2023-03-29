import {html,render} from './node_modules/lit-html/lit-html.js'
import { cats } from './catSeeder.js'

let section = document.getElementById('allCats');
let ul= document.createElement('ul');
section.appendChild(ul);

let catCard =(info)=>html`
<li>
    <img src="./images/${info.imageLocation + '.jpg'}" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn" >Show status code</button>
        <div class="status" style="display: none" id="${info.id}">
            <h4>Status Code: ${info.statusCode}</h4>
            <p>${info.statusMessage}</p>
        </div>
    </div>
</li>
`;

function onToggle(e){
    if(e.target.textContent == "Show status code"){
        e.target.textContent = "Hide status code";
        e.target.nextElementSibling.style.display ="block";
    }else if(e.target.textContent == "Hide status code"){
        e.target.textContent = "Show status code";
        e.target.nextElementSibling.style.display ="none";
    }
}

/* First version

let catCard =(info)=>html`
<li>
    <img src="./images/${info.imageLocation + '.jpg'}" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn" @click=${onToggle}>Show status code</button>
        <div class="status" style="display: none" id="${info.id}">
            <h4>Status Code: ${info.statusCode}</h4>
            <p>${info.statusMessage}</p>
        </div>
    </div>
</li>
`;

function onToggle(e){
    if(e.target.textContent == "Show status code"){
        e.target.textContent = "Hide status code";
        e.target.nextElementSibling.style.display ="block";
    }else if(e.target.textContent == "Hide status code"){
        e.target.textContent = "Show status code";
        e.target.nextElementSibling.style.display ="none";
    }
} 
render(cats.map(cat=>catCard(cat)),ul);

*/

render(cats.map(cat=>catCard(cat)),ul);
ul.addEventListener('click',onToggle);