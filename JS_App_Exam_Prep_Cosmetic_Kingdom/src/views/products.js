import { getAll } from "../api/data.js";
import { html } from "../lib.js";


let productsTemplate =(data)=> html`
${data.length>0 
? html`<h2>Products</h2>
<section id="dashboard">
  ${data.map(p=>productTemplate(p))}
</section>`
: html`<h2>No products yet.</h2>`}
`;

let productTemplate=(product)=>html`
<div class="product">
    <img src=${product.imageUrl} alt="example1" />
    <p class="title">${product.name.trim()}</p>
    <p><strong>Price:</strong><span class="price">${product.price.trim()}</span>$</p>
    <a  class="details-btn" href="/products/${product._id}">Details</a>
  </div>
`;


export async function showProducts(ctx){
   let data = await getAll(); 
   ctx.render(productsTemplate(data));
   
}