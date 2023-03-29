import { html, render} from './node_modules/lit-html/lit-html.js';

let divRoot = document.getElementById('root');
let form = document.querySelector('form');
let input = document.getElementById('towns');

let ul = document.createElement('ul');
divRoot.appendChild(ul)

form.addEventListener('submit', onSubmit)


function onSubmit(e){
    e.preventDefault();
    let data= input.value.split(', ');
    let ul= document.querySelector('ul');
    ul.replaceChildren();
    form.reset();
    render(data.map(str=>createElement(str)), ul);


    function createElement(str){
      return  html`<li>${str}</li>`;
    }
}

