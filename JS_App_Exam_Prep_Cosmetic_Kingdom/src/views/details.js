
import { boughtCount, boughtItem, deleteById, getById,isBought } from "../api/data.js";
import { getDataUser } from "../api/user.js";
import { html, nothing } from "../lib.js";


let productTemplate = (data,hasUser, hasOwner, onDelete,increaseCount,count,isBoughtAlready) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${data.imageUrl} alt="example1" />
  <p id="details-title">${data.name}</p>
  <p id="details-category">
    Category: <span id="categories">${data.category}</span>
  </p>
  <p id="details-price">
    Price: <span id="price-number">${data.price}</span>$</p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Bought: <span id="buys">${count}</span> times.</h4>
      <span>${data.description}</span
      >
    </div>
  </div>
<div id="action-buttons">
${!hasUser 
  ? nothing 
  :(hasOwner 
  ? html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
<a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
:(isBoughtAlready ? nothing :html`<a @click=${increaseCount} href="javascript:void(0)" id="buy-btn">Buy</a>`))}
</div>
    
 
</div>
</section>
`;




export async function showDetails(ctx) {
  let data = await getById(ctx.params.id);
  let hasUser = ctx.hasUser;
  let productId=ctx.params.id;
  let userId = getDataUser()._id;
  let [count,isBoughtAlready] = await Promise.all([boughtCount(productId),isBought(productId,userId)])

  // let hasOwner = hasUser && data._ownerId == getDataUser()._id;

  let hasOwner=data._ownerId == getDataUser()._id;
  ctx.render(productTemplate(data,hasUser, hasOwner, onDelete,increaseCount,count,isBoughtAlready));

  async function onDelete() {

    if (confirm("Are you sure you want to delete product?")) {

      deleteById(ctx.params.id);
      ctx.page.redirect('/products');
    }
  }

 async function increaseCount(){
 await boughtItem(productId);
 ctx.page.redirect(`/products/${productId}`);
  

}

  

}