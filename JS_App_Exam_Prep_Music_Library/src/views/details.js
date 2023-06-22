import { deleteById, getById, getOwnLikes, getTotalLikes ,addLike} from '../api/data.js';
import { html, nothing } from '../lib.js';
import { getDataUser } from '../util.js';


const detailsTemplate = (data, id,isLiked,totalLikes, hasUser, hasOwner, onDelete,onLike) => html`
<section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src="${data.imageUrl}" alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${data.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${totalLikes}</span></div>
          <div id="action-buttons">
          ${!hasUser
    ? nothing
    : (!hasOwner && !isLiked ? html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>` :
      (!hasOwner &&  isLiked ? nothing
      :(hasOwner ? html`
      <a href="/edit/${id}" id="edit-btn">Edit</a>
      <a  @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
      : nothing )))}
        </div> 
        </div>
      </section>
`;

export async function showDetails(ctx) {
  
  let id = ctx.params.id;
  let hasUser = ctx.hasUser;
  let [data,totalLikes] = await Promise.all([getById(id), getTotalLikes(id)])
  let result = getDataUser();
  let owner;
  let hasOwner = false;
  let isLiked= 0;
  if (hasUser) {
    owner = result._id;
    hasOwner = owner == data._ownerId;
    isLiked = await getOwnLikes(id, result._id)
  }



  ctx.render(detailsTemplate(data, id,isLiked,totalLikes, hasUser, hasOwner, onDelete,onLike));

  async function onDelete() {
    await deleteById(id);
    ctx.page.redirect('/catalog');
  }

  async function onLike() {
    await addLike(id);
    ctx.page.redirect(`/catalog/${id}`)
  }

}