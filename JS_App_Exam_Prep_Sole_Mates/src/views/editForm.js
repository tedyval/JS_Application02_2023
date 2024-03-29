import { getById, updateById } from '../api/data.js';
import { html} from '../lib.js';

let editTemplate = (data,onSubmit)=>html`
<section id="edit">
<div class="form">
  <h2>Edit item</h2>
  <form @submit=${onSubmit} class="edit-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
      .value =${data.brand}
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
      .value =${data.model}
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
      .value =${data.imageUrl}
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
      .value =${data.release}
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
      .value =${data.designer}
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
      .value =${data.value}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>
`;

export async function showEditForm(ctx){
    let id= ctx.params.id;
    let data = await getById(id);

    ctx.render(editTemplate(data,onSubmit));

    async function onSubmit(e){
       e.preventDefault();

       let formData = new FormData(e.target);
       let {brand,model,imageUrl,release,designer,value} = Object.fromEntries(formData);

       if([brand,model,imageUrl,release,designer,value].some(val=> val=="")){
        alert("All fields must be fulfilled");
        return
       }

       await updateById(id,{brand,model,imageUrl,release,designer,value});
       ctx.page.redirect('/dashboard')
    }


}