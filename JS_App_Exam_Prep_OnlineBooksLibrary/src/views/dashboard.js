import {html} from '../lib.js';
import { getAll } from '../api/data.js'; 


 export let dashboardTemplate =(data,isData)=>html`
 <section id="dashboard-page" class="dashboard">
 <h1>Dashboard</h1>
 ${isData ? html` <ul class="other-books-list">
 ${data.map(info=>html`<li class="otherBooks">
 <h3>${info.title}</h3>
 <p>Type: ${info.type}</p>
 <p class="img"><img src="${info.imageUrl}"></p>
 <a class="button" href="/details/${info._id}">Details</a>
</li>`)}
 
</ul>` : html`<p class="no-books">No books in database!</p>`}
</section>
`;


export async function showDashboard(ctx){
  let data =  await getAll();
  let isData = data.length >0 ? true : false;
  ctx.render(dashboardTemplate(data,isData));

  

}