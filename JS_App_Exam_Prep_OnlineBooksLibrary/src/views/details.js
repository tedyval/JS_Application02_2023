import {html, nothing} from '../lib.js';

import { addLikeById, deleteItem, getById, getIsLiked, getLikesCount } from '../api/data.js'; 



 let detailsTemplate =(hasUser,data,count,isApplied,isOwner,onDelete,onLiked)=>html`
<section id="details-page" class="details">
  <div class="book-information">
      <h3>${data.title}</h3>
      <p class="type">Type: ${data.type}</p>
      <p class="img"><img src="${data.imageUrl}"></p>
      <div class="actions">
      ${hasUser && isOwner ? html` <a class="button" href="/edit/${data._id}">Edit</a>
      <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
      <div class="likes">
      <img class="hearts" src="/images/heart.png">
      <span id="total-likes">Likes: ${count}</span>
      </div>` 
      : (hasUser && !isOwner && !isApplied ? html`<a @click=${onLiked} class="button" href="javascript:void(0)">Like</a>
      <div class="likes">
      <img class="hearts" src="/images/heart.png">
      <span id="total-likes">Likes: ${count}</span>
      </div>` 
      : ((hasUser && !isOwner && isApplied) || !hasUser ? html`<div class="likes">
      <img class="hearts" src="/images/heart.png">
      <span id="total-likes">Likes: ${count}</span>
            </div>` :null))}
  </div>
  </div>
      <div class="book-description">
      <h3>Description:</h3>
      <p>${data.description}</p>
  </div> 
</section>
`;


export async function showDetails(ctx){
  let id = ctx.params.id;
  let hasUser = ctx.hasUser;
  
  let data = await getById(id);
  let ownId = ctx.userId
  let [count,isApp] = await Promise.all([getLikesCount(id),getIsLiked(id,ownId)])

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

  ctx.render(detailsTemplate(hasUser,data,count,isApplied,isOwner,onDelete,onLiked));

  async function onDelete(){
    await deleteItem(id);
    ctx.page.redirect('/dashboard');
  }

  async function onLiked(){
    await addLikeById(id);
    ctx.page.redirect(`/details/${id}`)
  }



}