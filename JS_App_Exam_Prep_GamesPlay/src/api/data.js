import { get,post,put,del } from "./api.js";

export async function getFirstThreeGames(){
 return get(`/data/games?sortBy=_createdOn%20desc&distinct=category`);
}

export async function getAll(){
  return  get('/data/games?sortBy=_createdOn%20desc');
}

export async function getById(id){
  return  get(`/data/games/${id}`);
}

export async function createItem({title,category,maxLevel,imageUrl,summary}){
  return  post(`/data/games`,{title,category,maxLevel,imageUrl,summary});
}

export async function updateItem(id,{title,category,maxLevel,imageUrl,summary}){
  return  put(`/data/games/${id}`,{title,category,maxLevel,imageUrl,summary});
}


export async function deleteItem(id){
  return  del(`/data/games/${id}`);
}

export async function getAllComentsById(gameId){
 return get(`/data/comments?where=gameId%3D%22${gameId}%22`)
}

export async function addCommentById(gameId,comment){
 return post(`/data/comments`,{gameId,comment})
}

export async function isCommentedFromUser(id,ownerId){
  return get(`/data/comments?where=offerId%3D%22${id}%22%20and%20_ownerId%3D%22${ownerId}%22&count`)
}







