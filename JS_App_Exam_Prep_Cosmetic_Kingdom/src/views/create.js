import { createItem } from "../api/data.js";
import { html } from "../lib.js";




let productTemplate=(onSubmit)=>html`
<section id="create">
<div class="form">
  <h2>Add Product</h2>
  <form @submit=${onSubmit} class="create-form">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Product Name"
    />
    <input
      type="text"
      name="imageUrl"
      id="product-image"
      placeholder="Product Image"
    />
    <input
      type="text"
      name="category"
      id="product-category"
      placeholder="Category"
    />
    <textarea
      id="product-description"
      name="description"
      placeholder="Description"
      rows="5"
      cols="50"
    ></textarea>
    
    <input
      type="text"
      name="price"
      id="product-price"
      placeholder="Price"
    />

    <button type="submit">Add</button>
  </form>
</div>
</section>
`;


export async function showCreate(ctx){
   ctx.render(productTemplate(onSubmit));

   async function onSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    let {name,imageUrl,category,description,price} = Object.fromEntries(formData);
   
    let empty =[name,imageUrl,category,description,price].some(i=>i == '');
    if(empty){
     return alert("All fields are requered")
      
    }

    await createItem({name,imageUrl,category,description,price});
    ctx.page.redirect('/products');
    
   }
   
}

