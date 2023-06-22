import {html} from '../lib.js';
import { getAll } from '../api/data.js'; 


 let dashboardTemplate =(data,isData)=>html`
<section id="dashboard">
<h2>Job Offers</h2>
${isData ?html`${data.map(info=>html`<div class="offer">
<img src="${info.imgeUrl}" alt="example1" />
<p>
  <strong>Title: </strong><span class="title">${info.title}</span>
</p>
<p><strong>Salary:</strong><span class="salary">${info.salary}</span></p>
<a class="details-btn" href="/details/${info._id}">Details</a>
</div>`)}`: html`<h2>No offers yet.</h2>`}
</section>
`;


export async function showDashboard(ctx){
  let data =  await getAll();
  let isData = data.length >0 ? true : false;
  ctx.render(dashboardTemplate(data,isData));

  

}