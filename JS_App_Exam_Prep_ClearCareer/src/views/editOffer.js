import {html} from '../lib.js';
import { getById,updateItem } from '../api/data.js'; 


 let editTemplate =(data,onSubmit)=>html`
 <section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                .value="${data.title}"
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                .value="${data.imageUrl}"
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                .value="${data.category}"
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
                .value="${data.description}"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
                .value="${data.requirements}"
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                .value="${data.salary}"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
  `;


export async function showEditForm(ctx){
   let id = ctx.params.id;
   let data = await getById(id)
 
ctx.render(editTemplate(data,onSubmit));
  
async function onSubmit(e){
    e.preventDefault();

    let formData = new FormData(e.target);

    let {title,imageUrl,category,description,requirements,salary} =Object.fromEntries(formData);

    if([title,imageUrl,category,description,requirements,salary].some(val=> val == "")){
      alert("All fields are reqiered");
      return

    }

    
    await updateItem(id,{title,imageUrl,category,description,requirements,salary});
    ctx.page.redirect(`/details/${id}`);
}


  

}