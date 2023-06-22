import {html} from '../lib.js';
import { getAll } from '../api/data.js'; 


 let dashboardTemplate =(data,isData)=>html`
 <section id="catalog-page">
 <h1>All Games</h1>

 ${isData ? html`${data.map(info=>html` 
 <div class="allGames">
    <div class="allGames-info">
        <img src="${info.imageUrl}">
        <h6>${info.category}</h6>
        <h2>${info.title}</h2>
        <a href="/details/${info._id}" class="details-button">Details</a>
    </div>

 </div>` )}` : html`<h3 class="no-articles">No articles yet</h3>`}

</section>
`;



export async function showDashboard(ctx){
  let data =  await getAll();
  let isData = data.length >0 ? true : false;
  ctx.render(dashboardTemplate(data,isData));

  

}