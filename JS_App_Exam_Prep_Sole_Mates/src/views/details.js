
import { getById,deleteById } from '../api/data.js';
import {html} from '../lib.js';

let detailsTemplate = (data,isCreator,onDelete)=> html`
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Shoe Details</p>
  <div id="img-wrapper">
    <img src="${data.imageUrl}" alt="example1" />
  </div>
  <div id="info-wrapper">
    <p>Brand: <span id="details-brand">${data.brand}</span></p>
    <p>
      Model: <span id="details-model">${data.model}</span>
    </p>
    <p>Release date: <span id="details-release">${data.release}</span></p>
    <p>Designer: <span id="details-designer">${data.designer}</span></p>
    <p>Value: <span id="details-value">${data.value}</span></p>
  </div>
   ${isCreator ? html`<div id="action-buttons">
   <a href="/edit/${data._id}" id="edit-btn">Edit</a>
   <a  @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
 </div>`: null}
</div>
</section>
`;

export async function showDetails(ctx){
    let id = ctx.params.id;
    let hasUser = ctx.hasUser;
    let isCreator=false;

    let data = await getById(id);
    let ownerId = data._ownerId;
    if(hasUser && ownerId == ctx.userId){
        isCreator = true;
    }

    ctx.render(detailsTemplate(data,isCreator,onDelete));

    async function onDelete(){
       await deleteById(id);
       ctx.page.redirect("/dashboard")
    }
}