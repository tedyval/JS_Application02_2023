import { get,post,put,del } from "./api.js";

export async function getAll(){
  return  get('/data/books?sortBy=_createdOn%20desc');
}

export async function getAllMyBooks(userId){
  return  get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getById(id){
  return  get(`/data/books/${id}`);
}

export async function createItem({title,description,imageUrl,type}){
  return  post(`/data/books`,{title,description,imageUrl,type});
}

export async function updateItem(id,{title,description,imageUrl,type}){
  return  put(`/data/books/${id}`,{title,description,imageUrl,type});
}


export async function deleteItem(id){
  return  del(`/data/books/${id}`);
}

export async function getLikesCount(bookId){
 return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
}

export async function getIsLiked(bookId,userId){
return  get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function addLikeById(bookId){
 return post(`/data/likes`,{bookId})
}







