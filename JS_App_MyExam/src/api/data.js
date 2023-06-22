import { get,post,put,del } from "./api.js";

export async function getAll(){
  return  get('/data/events?sortBy=_createdOn%20desc');
}

export async function getById(id){
  return  get(`/data/events/${id}`);
}

export async function createItem({name,imageUrl,category,description,date}){
  return  post(`/data/events`,{name,imageUrl,category,description,date});
}

export async function updateItem(id,{name,imageUrl,category,description,date}){
  return  put(`/data/events/${id}`,{name,imageUrl,category,description,date});
}


export async function deleteItem(id){
  return  del(`/data/events/${id}`);
}

export async function getAppCount(eventId){
 return get(`/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`)
}

export async function getIsApplied(eventId,userId){
return  get(`/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function applyById(eventId){
 return post(`/data/going`,{eventId})
}







