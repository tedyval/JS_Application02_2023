import { get,post,put,del } from "./api.js";

export async function getAll(){
  return  get('/data/offers?sortBy=_createdOn%20desc');
}

export async function getById(id){
  return  get(`/data/offers/${id}`);
}

export async function createItem({title,imageUrl,category,description,requirements,salary}){
  return  post(`/data/offers`,{title,imageUrl,category,description,requirements,salary});
}

export async function updateItem(id,{title,imageUrl,category,description,requirements,salary}){
  return  put(`/data/offers/${id}`,{title,imageUrl,category,description,requirements,salary});
}


export async function deleteItem(id){
  return  del(`/data/offers/${id}`);
}

export async function getAppCount(offerId){
 return get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`)
}

export async function getIsApplied(offerId,userId){
return  get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function applyById(offerId){
 return post(`/data/applications`,{offerId})
}







