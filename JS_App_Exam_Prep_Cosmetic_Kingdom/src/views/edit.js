import { getById, updateItem } from "../api/data.js";
import { html } from "../lib.js";




let productTemplate=(data,onSubmit)=>html`
<section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                .value=${data.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
                .value=${data.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                .value=${data.category}
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                .value=${data.description}
                rows="5"
                cols="50"
              ></textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                .value=${data.price}
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;


export async function showEditForm(ctx){
    let id = ctx.params.id;
    let data = await getById(id);
   ctx.render(productTemplate(data,onSubmit));

   async function onSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    let {name,imageUrl,category,description,price} = Object.fromEntries(formData);
   
    let empty =[name,imageUrl,category,description,price].some(i=>i == '');
    if(empty){
     return alert("All fields are requered")
      
    }
     console.log(id);
    await updateItem(id,{name,imageUrl,category,description,price});
    ctx.page.redirect('/products');
    
   }
   
}

