import {html} from '../lib.js';
import { getAll } from '../api/data.js'; 


 let dashboardTemplate =(data,isData)=>html`
 <h2>Current Events</h2>
 ${isData ? html`<section id="dashboard">
 ${data.map(info=>html`<div class="event">
 <img src="${info.imageUrl}" alt="example1" />
 <p class="title">${info.name}</p>
 <p class="date">${info.date}</p>
 <a class="details-btn" href="/details/${info._id}">Details</a>
</div> `)}

</section>` : html` <h4>No Events yet.</h4>`}
`;


export async function showDashboard(ctx){
  let data =  await getAll();
  let isData = data.length >0 ? true : false;
  ctx.render(dashboardTemplate(data,isData));

  

}