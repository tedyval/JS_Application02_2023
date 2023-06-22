import { getAll } from '../api/data.js';
import {html} from '../lib.js';

let catalogTemplate=(data,albumTemplate)=> html`
<section id="dashboard">
 ${data.length > 0 
    ? html`<h2>Albums</h2>
    <ul class="card-wrapper">
      ${data.map(info=>albumTemplate(info))} 
    </ul>`
: html` <h2>There are no albums added yet.</h2>`}    
      </section>
`;

let albumTemplate=(info)=>html`<li class="card">
<img src="${info.imageUrl}" alt="travis" />
<p><strong>Singer/Band: </strong><span class="singer">${info.singer}</span></p>
<p><strong>Album name: </strong><span class="album">${info.album}</span></p>
<p><strong>Sales:</strong><span class="sales">${info.sales}</span></p>
<a  class="details-btn" href="/catalog/${info._id}">Details</a>
</li>`;

export async function showAlbums(ctx){
   let data = await getAll();
  
   ctx.render(catalogTemplate(data,albumTemplate));

}