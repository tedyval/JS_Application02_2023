import {html} from '../lib.js';
import { getAllMyBooks } from '../api/data.js'; 


 let myBooksTemplate =(data,isData)=>html`
 <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            ${isData ? html` <ul class="my-books-list">
            ${data.map(info=>html`<li class="otherBooks">
            <h3>${info.title}</h3>
            <p>Type: ${info.type}</p>
            <p class="img"><img src="${info.imageUrl}"></p>
            <a class="button" href="/details/${info._id}">Details</a>
        </li>`)}
            </ul>` : html` <p class="no-books">No books in database!</p>`}
           
</section>
`;


export async function showMyBooks(ctx){
    let userId= ctx.userId;
  let data =  await getAllMyBooks(userId);
  let isData = data.length >0 ? true : false;
  ctx.render(myBooksTemplate(data,isData));

  

}