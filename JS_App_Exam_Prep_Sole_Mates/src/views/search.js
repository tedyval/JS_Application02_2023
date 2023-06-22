import { getSerchedItems } from '../api/data.js';
import { html } from '../lib.js';


let searchTemplate = (onSubmit,hasData, result) => html`
<section id="search">
          <h2>Search by Brand</h2>

          <form @submit=${onSubmit} class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>

          <div id="search-container">
         ${hasData ? result : html`<h2>There are no results found.</h2>`}
        </div>
        </section>
`;

// list(data,itemTemplate,hasUser)
// 
function list(data, itemTemplate, hasUser) {
  return html`<ul class="card-wrapper">
    ${data.map(info => itemTemplate(info, hasUser))}
  </ul>`
}

let itemTemplate = (info, hasUser) => html`<li class="card">
<img src="${info.imageUrl}" alt="travis" />
<p>
  <strong>Brand: </strong><span class="brand">${info.brand}</span>
</p>
<p>
  <strong>Model: </strong
  ><span class="model">${info.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${info.value}</span>$</p>
${hasUser
    ? html`<a class="details-btn" href="/details/${info._id}">Details</a>`
    : null}
</li>`;

export async function showSearch(ctx,hasData, result) {
  let hasUser = ctx.hasUser;
  ctx.render(searchTemplate(onSubmit,hasData, result));

  async function onSubmit(e) {
    e.preventDefault();
    let inpValue = e.target.querySelector('input').value;
    if (inpValue == "") {
      alert("Search criterion is needed");
      return;
    }

    let dataNew = await getSerchedItems(inpValue);
    let hasData;
    let result;
    if (dataNew.length == 0) {
      hasData = false;
    } else {
      hasData =true;
      result = list(dataNew, itemTemplate, hasUser)
    }

    showSearch = showSearch.bind(null, ctx,hasData, result);
    showSearch();

  }


}