import { getAll } from '../api/data.js';
import {html} from '../lib.js';

let dashboardTemplate = (data,hasData,infoTemplate)=> html`
<section id="dashboard">
<h2>Collectibles</h2>
${hasData 
    ? html`<ul class="card-wrapper">
    ${data.map(info=> infoTemplate(info))}
</ul>` 
: html`<h2>There are no items added yet.</h2>`}
</section>
`;

let infoTemplate =(info)=>html`
<li class="card">
  <img src=${info.imageUrl} alt="travis" />
  <p>
    <strong>Brand: </strong><span class="brand">${info.brand}</span>
  </p>
  <p>
    <strong>Model: </strong
    ><span class="model">${info.model}</span>
  </p>
  <p><strong>Value:</strong><span class="value">${info.value}</span>$</p>
  <a class="details-btn" href="/details/${info._id}">Details</a>
</li>
`;


export async function showDashboard(ctx){
    let data = await getAll();

    let hasData = data.length>0 ? true : false;

    ctx.render(dashboardTemplate(data,hasData,infoTemplate));
    
}