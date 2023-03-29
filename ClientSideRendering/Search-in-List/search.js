import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

let input = document.querySelector('#searchText');
let btn = document.querySelector('button');
let divTowns = document.getElementById('towns');
let divResult = document.querySelector('#result');
let createLi = (town, classAct = "") => html`<li class=${classAct}>${town}</li>`;
let ul = (towns, createLi) => html`
<ul>
${towns.map(town => createLi(town))}
</ul>
`;

render(ul(towns, createLi), divTowns);
btn.addEventListener('click', search);


function search() {
   let ul=document.querySelector('ul');
   ul.replaceChildren();
   let results = towns.filter(town => town.includes(input.value));
  let newTowns = towns.map(town => {
      if (town.includes(input.value)) {
        return createLi(town, "active")
      }else{
        return createLi(town, "")
      }
   });
   render(newTowns,ul );
   input.value="";
   divResult.textContent = `${results.length} matches found`
}
