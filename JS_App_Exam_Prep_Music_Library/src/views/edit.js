import { getById, updateAlbum } from '../api/data.js';
import { html} from '../lib.js';


const editTemplate = (data, onSubmit) => html`
<section id="edit">
<div class="form">
  <h2>Edit Album</h2>
  <form @submit=${onSubmit} class="edit-form">
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${data.singer.trim()} />
    <input type="text" name="album" id="album-album" placeholder="Album" .value=${data.album.trim()} />
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${data.imageUrl.trim()} />
    <input type="text" name="release" id="album-release" placeholder="Release date" .value=${data.release.trim()} />
    <input type="text" name="label" id="album-label" placeholder="Label" .value=${data.label.trim()} />
    <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${data.sales.trim()} />

    <button type="submit">post</button>
  </form>
</div>
</section>  
`;

export async function showEditForm(ctx){
    let id = ctx.params.id
   let data= await getById(id);
    ctx.render(editTemplate(data,onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        let formData = new FormData(event.target);
        let {singer,album,imageUrl,release,label,sales} = Object.fromEntries(formData);

        if([singer,album,imageUrl,release,label,sales].some(f=>f=="")){
            alert("All fields are requered");
            event.target.reset();
            return
        }

        await updateAlbum(id,{singer,album,imageUrl,release,label,sales});
        event.target.reset();
        ctx.page.redirect('/catalog');
    }
}



