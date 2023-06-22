import { create } from '../api/data.js';
import { html} from '../lib.js';


let createTemplate = (onSubmit)=>html`
<section id="create">
<div class="form">
  <h2>Add item</h2>
  <form @submit=${onSubmit} class="create-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
    />

    <button type="submit">post</button>
  </form>
</div>
</section>
`;

export async function showAddForm(ctx){
  ctx.render(createTemplate(onSubmit));

 async function onSubmit(e){
    e.preventDefault();

    let formData = new FormData(e.target);
    let {brand,model,imageUrl,release,designer,value} = Object.fromEntries(formData);

    if([brand,model,imageUrl,release,designer,value].some(val=> val=="")){
     alert("All fields must be fulfilled");
     return
    }

    await create({brand,model,imageUrl,release,designer,value});
    ctx.page.redirect('/dashboard')
    

 }

}