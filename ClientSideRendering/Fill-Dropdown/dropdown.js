import { html, render } from './node_modules/lit-html/lit-html.js';

let select = document.querySelector('#menu');
let form = document.querySelector('form');


let data = Object.values(await getData());

async function getData() {
    let response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    let data = await response.json();
    return data;
}

let createOption = (info) => html
    `
<option value=${info._id}>${info.text}</option>
`;

render(data.map(info => createOption(info)), select)
form.addEventListener('submit', addItem)

async function addItem(e) {
    e.preventDefault();
    let value = document.querySelector('#itemText').value;
    let response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: value })
    });
    let data = Object.values(await getData());
    render(data.map(info => createOption(info)), select);
    form.reset();
}