import {html, nothing} from '../lib.js';

import { applyById, deleteItem, getAppCount, getById, getIsApplied } from '../api/data.js'; 



 let detailsTemplate =(hasUser,data,count,isApplied,isOwner,onDelete,onApply)=>html`
 <section id="details">
 <div id="details-wrapper">
   <img id="details-img" src="${data.imageUrl}" />
   <p id="details-title">${data.name}</p>
   <p id="details-category">
     Category: <span id="categories">${data.category}</span>
   </p>
   <p id="details-date">
     Date:<span id="date">${data.date}</span></p>
   <div id="info-wrapper">
     <div id="details-description">
       <span>${data.description}</span>
     </div>

   </div>
   ${hasUser && isOwner ? html`<h3>Going: <span id="go">${count}</span> times.</h3>
   <div id="action-buttons">
     <a href="/edit/${data._id}" id="edit-btn">Edit</a>
     <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
   </div>` : (hasUser && !isOwner && !isApplied ? html`<h3>Going: <span id="go">${count}</span> times.</h3>
   <div id="action-buttons">
   <a  @click=${onApply} href="javascript:void(0)" id="go-btn">Going</a>
   </div>` : (hasUser && !isOwner && isApplied || !hasUser ? html`<h3>Going: <span id="go">${count}</span> times.</h3>` : nothing))}
   
 </div>
</section>
`;


export async function showDetails(ctx){
  let id = ctx.params.id;
  let hasUser = ctx.hasUser;
  
  let data = await getById(id);
  let ownerId = ctx.userId
  let [count,isApp] = await Promise.all([getAppCount(id),getIsApplied(id,ownerId)])

  let isApplied;
  if(isApp == 0){
    isApplied = false;
  }else{
    isApplied = true;
  }
  let isOwner= false;
  if(ctx.userId == data._ownerId){
    isOwner = true;
  }

  ctx.render(detailsTemplate(hasUser,data,count,isApplied,isOwner,onDelete,onApply));

  async function onDelete(){
    await deleteItem(id);
    ctx.page.redirect('/dashboard');
  }

  async function onApply(){
    await applyById(id);
    ctx.page.redirect(`/details/${id}`)
  }



}