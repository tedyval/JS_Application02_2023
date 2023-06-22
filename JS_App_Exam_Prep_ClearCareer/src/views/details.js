import {html, nothing} from '../lib.js';

import { applyById, deleteItem, getAppCount, getById, getIsApplied } from '../api/data.js'; 



 let detailsTemplate =(hasUser,data,count,isApplied,isOwner,onDelete,onApply)=>html`
 <section id="details">
 <div id="details-wrapper">
   <img id="details-img" src="${data.imageUrl}" alt="example1" />
   <p id="details-title">${data.title}</p>
   <p id="details-category">
     Category: <span id="categories">${data.category}</span>
   </p>
   <p id="details-salary">
     Salary: <span id="salary-number">${data.salary}</span>
   </p>
   <div id="info-wrapper">
     <div id="details-description">
       <h4>Description</h4>
       <span>${data.description}</span
       >
     </div>
     <div id="details-requirements">
       <h4>Requirements</h4>
       <span>${data.requirements}</span>
     </div>
   </div>
   <p>Applications: <strong id="applications">${count}</strong></p>
   <div id="action-buttons">
   ${!hasUser ? nothing : (hasUser && isOwner ? html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
   <a   @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : (hasUser && !isOwner && isApplied ? nothing : html`<a @click="${onApply}" href="javascript:void(0)" id="apply-btn">Apply</a>`))}
   </div>
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