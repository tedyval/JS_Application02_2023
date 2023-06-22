import {html, nothing} from '../lib.js';

import { addCommentById,  deleteItem, getAllComentsById, getById, isCommentedFromUser } from '../api/data.js'; 



 let detailsTemplate =(hasUser,data,comments,resultComments,isOwner,onDelete,onComment)=>html`
 <section id="game-details">
 <h1>Game Details</h1>
 <div class="info-section">

     <div class="game-header">
         <img class="game-img" src="${data.imageUrl}" />
         <h1>${data.title}</h1>
         <span class="levels">MaxLevel: ${data.maxLevel}</span>
         <p class="type">${data.category}</p>
     </div>

     <p class="text">${data.summary}</p>
     <div class="details-comments">
     <h2>Comments:</h2>
     ${comments.length > 0 ? html`<ul>${resultComments}</ul>` : html`<p class="no-comment">No comments.</p>`}
     </div> 
   
  ${hasUser && isOwner ? 
  html`<div class="buttons">
  <a href="/edit/${data._id}" class="button">Edit</a>
  <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
  </div>`
  : nothing}
</div> 
${hasUser && !isOwner  ? 
html`<article class="create-comment">
<label>Add new comment:</label>
<form @submit=${onComment} class="form">
    <textarea name="comment" placeholder="Comment......"></textarea>
    <input class="btn submit" type="submit" value="Add Comment">
</form>
</article>`: nothing}
</section>
`;

let commentTemplate = (comt)=>html`<li class="comment">
<p>Content: ${comt.comment}</p>
</li>`;



export async function showDetails(ctx){
  let id = ctx.params.id;
  let hasUser = ctx.hasUser;
  
  
  
 let [data,comments]= await Promise.all([getById(id),getAllComentsById(id)])
 
  let resultComments=comments.map(comt=>commentTemplate(comt));
  
  let isOwner= false;
  if(ctx.userId == data._ownerId){
    isOwner = true;
  }

  

  ctx.render(detailsTemplate(hasUser,data,comments,resultComments,isOwner,onDelete,onComment));

  async function onDelete(){
    await deleteItem(id);
    ctx.page.redirect('/');
  }

  async function onComment(e){
    e.preventDefault();
    let textArea = e.target.querySelector("textarea")
    let valArea = textArea.value;
    if(valArea == ''){
      alert("Missing data.Please enter comment!")
      return
    }

    textArea.value ="";
    await addCommentById(id,valArea);
    ctx.page.redirect(`/details/${id}`)
  }


}